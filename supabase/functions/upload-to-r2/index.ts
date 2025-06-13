import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface R2Config {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get R2 configuration from environment variables
    const r2Config: R2Config = {
      accountId: Deno.env.get('R2_ACCOUNT_ID') || '',
      accessKeyId: Deno.env.get('R2_ACCESS_KEY_ID') || '',
      secretAccessKey: Deno.env.get('R2_SECRET_ACCESS_KEY') || '',
      bucketName: Deno.env.get('R2_BUCKET_NAME') || 'andres-castro-images'
    }

    // Validate configuration
    if (!r2Config.accountId || !r2Config.accessKeyId || !r2Config.secretAccessKey) {
      throw new Error('R2 configuration is incomplete')
    }

    // Parse form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    const fileName = formData.get('fileName') as string
    const fileType = formData.get('fileType') as string

    if (!file || !fileName) {
      throw new Error('File and fileName are required')
    }

    // Enhanced validation for images AND videos
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes]
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP images and MP4, WebM, MOV, AVI videos are allowed.')
    }

    // Different size limits for images vs videos
    const isVideo = allowedVideoTypes.includes(file.type)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for videos, 10MB for images
    
    if (file.size > maxSize) {
      const sizeLabel = isVideo ? '50MB' : '10MB'
      throw new Error(`File size too large. Maximum size is ${sizeLabel} for ${isVideo ? 'videos' : 'images'}.`)
    }

    console.log(`📤 Uploading ${isVideo ? 'video' : 'image'}: ${fileName} (${file.size} bytes)`)

    // Convert file to ArrayBuffer
    const fileBuffer = await file.arrayBuffer()

    // Create AWS signature for R2
    const region = 'auto' // R2 uses 'auto' as region
    const service = 's3'
    const endpoint = `https://${r2Config.accountId}.r2.cloudflarestorage.com`

    // Upload to R2 using AWS S3 compatible API
    const uploadUrl = `${endpoint}/${r2Config.bucketName}/${fileName}`
    
    // Create AWS v4 signature
    const now = new Date()
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '')
    const timeStamp = now.toISOString().slice(0, 19).replace(/[-:]/g, '') + 'Z'

    // Create canonical request
    const canonicalHeaders = `host:${r2Config.accountId}.r2.cloudflarestorage.com\nx-amz-content-sha256:UNSIGNED-PAYLOAD\nx-amz-date:${timeStamp}\n`
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'
    const canonicalRequest = `PUT\n/${r2Config.bucketName}/${fileName}\n\n${canonicalHeaders}\n${signedHeaders}\nUNSIGNED-PAYLOAD`

    // Create string to sign
    const algorithm = 'AWS4-HMAC-SHA256'
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
    const stringToSign = `${algorithm}\n${timeStamp}\n${credentialScope}\n${await sha256(canonicalRequest)}`

    // Calculate signature
    const signingKey = await getSignatureKey(r2Config.secretAccessKey, dateStamp, region, service)
    const signature = await hmacSha256(signingKey, stringToSign)

    // Create authorization header
    const authorization = `${algorithm} Credential=${r2Config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

    // Upload file to R2
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': authorization,
        'X-Amz-Date': timeStamp,
        'X-Amz-Content-Sha256': 'UNSIGNED-PAYLOAD',
        'Content-Type': file.type,
        'Content-Length': file.size.toString()
      },
      body: fileBuffer
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      throw new Error(`R2 upload failed: ${uploadResponse.status} ${errorText}`)
    }

    // Return the correct public URL format
    const publicUrl = `https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/${fileName}`

    console.log(`✅ Upload successful: ${fileName} -> ${publicUrl}`)

    return new Response(
      JSON.stringify({ 
        url: publicUrl,
        fileName: fileName,
        fileType: fileType,
        size: file.size,
        isVideo: isVideo
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

// Helper functions for AWS signature
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacSha256(key: Uint8Array, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message))
  const hashArray = Array.from(new Uint8Array(signature))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string): Promise<Uint8Array> {
  const kDate = await hmacSha256Raw(new TextEncoder().encode('AWS4' + key), dateStamp)
  const kRegion = await hmacSha256Raw(kDate, regionName)
  const kService = await hmacSha256Raw(kRegion, serviceName)
  const kSigning = await hmacSha256Raw(kService, 'aws4_request')
  return kSigning
}

async function hmacSha256Raw(key: Uint8Array, message: string): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message))
  return new Uint8Array(signature)
}