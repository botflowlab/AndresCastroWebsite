import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Resend API key from environment variables
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    // Parse request body
    const formData: ContactFormData = await req.json()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      throw new Error('Missing required fields')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format')
    }

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #0c0c0c; margin: 0 0 10px 0;">New Contact Form Submission</h2>
          <p style="color: #666; margin: 0;">From Andrés Castro Architecture Website</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3 style="color: #0c0c0c; margin-top: 0;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #212529;">${formData.firstName} ${formData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
              <td style="padding: 8px 0; color: #212529;">
                <a href="mailto:${formData.email}" style="color: #007bff; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            ${formData.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
              <td style="padding: 8px 0; color: #212529;">
                <a href="tel:${formData.phone}" style="color: #007bff; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
            ` : ''}
          </table>
          
          <h3 style="color: #0c0c0c; margin-top: 30px; margin-bottom: 15px;">Message</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            <p style="margin: 0; line-height: 1.6; color: #212529; white-space: pre-wrap;">${formData.message}</p>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            This email was sent from the contact form on your website.<br>
            Please reply directly to <strong>${formData.email}</strong> to respond to this inquiry.
          </p>
        </div>
      </div>
    `

    const emailText = `
New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}

---
This email was sent from the contact form on your website.
Please reply directly to ${formData.email} to respond to this inquiry.
    `

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@andrescastro.com>', // You'll need to configure this domain in Resend
        to: ['caricaco007@hotmail.com'],
        reply_to: formData.email,
        subject: `New Contact: ${formData.firstName} ${formData.lastName}`,
        html: emailHtml,
        text: emailText,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.error('Resend API error:', errorData)
      throw new Error(`Failed to send email: ${emailResponse.status}`)
    }

    const result = await emailResponse.json()
    console.log('✅ Email sent successfully:', result.id)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Email sent successfully',
        emailId: result.id
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Send email error:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
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