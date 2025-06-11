/**
 * SIMPLIFIED Cloudflare R2 Storage utilities
 * This is the most basic implementation possible
 */

// R2 configuration from environment variables
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;
const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME;

console.log('R2 Config:', { R2_PUBLIC_URL, R2_BUCKET_NAME });

// Validate R2 configuration
export const validateR2Config = () => {
  if (!R2_PUBLIC_URL || R2_PUBLIC_URL === 'undefined') {
    throw new Error('VITE_R2_PUBLIC_URL is not configured');
  }
  
  if (!R2_BUCKET_NAME || R2_BUCKET_NAME === 'undefined') {
    throw new Error('VITE_R2_BUCKET_NAME is not configured');
  }
  
  if (!R2_PUBLIC_URL.startsWith('https://')) {
    throw new Error('VITE_R2_PUBLIC_URL must start with https://');
  }
};

/**
 * SIMPLE: Convert any image URL to proper R2 URL
 * This is the ONLY function you need to worry about
 */
export const getImageUrl = (imageUrl) => {
  console.log('🖼️ Processing image URL:', imageUrl);
  
  // If no URL, return placeholder
  if (!imageUrl) {
    console.log('❌ No image URL provided, using placeholder');
    return '/images/placeholder.jpg';
  }
  
  // If it's already a full HTTP URL, use it as-is
  if (imageUrl.startsWith('http')) {
    console.log('✅ Full URL detected:', imageUrl);
    return imageUrl;
  }
  
  // If it's a local image (starts with /), use it as-is
  if (imageUrl.startsWith('/')) {
    console.log('📁 Local image detected:', imageUrl);
    return imageUrl;
  }
  
  // Otherwise, assume it's a filename and construct R2 URL
  const r2Url = `${R2_PUBLIC_URL}/${imageUrl}`;
  console.log('🔗 Constructed R2 URL:', r2Url);
  return r2Url;
};

/**
 * SIMPLE: Upload file to R2
 */
export const uploadToR2 = async (file, fileType = 'image', setUploadProgress = () => {}) => {
  try {
    validateR2Config();
    
    console.log('📤 Uploading file:', file.name);
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 9);
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${fileType}-${timestamp}-${randomString}.${fileExt}`;
    
    console.log('📝 Generated filename:', fileName);
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);

    // Upload via Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-to-r2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    setUploadProgress(100);
    
    console.log('✅ Upload successful:', result.url);
    return result.url;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
};

/**
 * SIMPLE: Delete file from R2
 */
export const deleteFromR2 = async (imageUrl) => {
  try {
    if (!imageUrl) return false;

    // Extract filename from URL
    const fileName = imageUrl.split('/').pop().split('?')[0];
    console.log('🗑️ Deleting file:', fileName);

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-from-r2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Delete failed with status ${response.status}`);
    }

    console.log('✅ Delete successful');
    return true;
  } catch (error) {
    console.error('❌ Delete failed:', error);
    return false;
  }
};

/**
 * SIMPLE: Batch upload multiple files
 */
export const batchUploadToR2 = async (files, fileType = 'image', setUploadProgress = () => {}) => {
  const uploadedUrls = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const url = await uploadToR2(file, fileType, (progress) => {
        const overallProgress = ((i + (progress / 100)) / files.length) * 100;
        setUploadProgress(overallProgress);
      });
      
      uploadedUrls.push(url);
    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw new Error(`Failed to upload ${file.name}: ${error.message}`);
    }
  }
  
  return uploadedUrls;
};

/**
 * SIMPLE: Batch delete multiple files
 */
export const batchDeleteFromR2 = async (imageUrls) => {
  let success = 0;
  let failed = 0;
  
  for (const url of imageUrls) {
    try {
      const result = await deleteFromR2(url);
      if (result) {
        success++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error('Failed to delete:', url, error);
      failed++;
    }
  }
  
  return { success, failed };
};

// Legacy function names for compatibility
export const normalizeImageUrl = getImageUrl;
export const getThumbnailUrl = getImageUrl;
export const getOptimizedImageUrl = (imageUrl) => getImageUrl(imageUrl);
export const testImageUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD', mode: 'cors' });
    return response.ok;
  } catch {
    return false;
  }
};