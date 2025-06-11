/**
 * ULTRA-SIMPLE Cloudflare R2 Storage utilities
 * ONE FUNCTION TO RULE THEM ALL
 */

// R2 configuration
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

console.log('🔧 R2 Config:', { R2_PUBLIC_URL });

/**
 * THE ONLY FUNCTION YOU NEED
 * Converts any image reference to a working URL
 */
export const getImageUrl = (imageUrl) => {
  console.log('🖼️ Input:', imageUrl);
  
  // No URL = placeholder
  if (!imageUrl) {
    console.log('❌ No URL, using placeholder');
    return '/images/placeholder.jpg';
  }
  
  // Already the correct public URL = use as-is
  if (imageUrl.includes('pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev')) {
    console.log('✅ Correct public URL:', imageUrl);
    return imageUrl;
  }
  
  // Wrong R2 URL format = fix it
  if (imageUrl.includes('.r2.cloudflarestorage.com')) {
    const fileName = imageUrl.split('/').pop();
    const fixedUrl = `${R2_PUBLIC_URL}/${fileName}`;
    console.log('🔧 Fixed R2 URL:', imageUrl, '->', fixedUrl);
    return fixedUrl;
  }
  
  // Full URL but not R2 = use as-is
  if (imageUrl.startsWith('http')) {
    console.log('🌐 External URL:', imageUrl);
    return imageUrl;
  }
  
  // Local image = use as-is
  if (imageUrl.startsWith('/')) {
    console.log('📁 Local image:', imageUrl);
    return imageUrl;
  }
  
  // Must be a filename = build R2 URL
  if (!R2_PUBLIC_URL) {
    console.log('❌ No R2_PUBLIC_URL, using placeholder');
    return '/images/placeholder.jpg';
  }
  
  const finalUrl = `${R2_PUBLIC_URL}/${imageUrl}`;
  console.log('🔗 R2 URL from filename:', finalUrl);
  return finalUrl;
};

// Keep these for compatibility but they all use the same function
export const normalizeImageUrl = getImageUrl;
export const getThumbnailUrl = getImageUrl;
export const getOptimizedImageUrl = getImageUrl;

// Upload function (simplified)
export const uploadToR2 = async (file, fileType = 'image', setUploadProgress = () => {}) => {
  try {
    console.log('📤 Uploading:', file.name);
    
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 9);
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${fileType}-${timestamp}-${randomString}.${fileExt}`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-to-r2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed`);
    }

    const result = await response.json();
    setUploadProgress(100);
    
    console.log('✅ Upload success:', result.url);
    
    // Ensure we return the correct public URL format
    return getImageUrl(result.url);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
};

// Batch upload
export const batchUploadToR2 = async (files, fileType = 'image', setUploadProgress = () => {}) => {
  const uploadedUrls = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = await uploadToR2(file, fileType, (progress) => {
      const overallProgress = ((i + (progress / 100)) / files.length) * 100;
      setUploadProgress(overallProgress);
    });
    uploadedUrls.push(url);
  }
  
  return uploadedUrls;
};

// Delete function (simplified)
export const deleteFromR2 = async (imageUrl) => {
  try {
    if (!imageUrl) return false;
    
    const fileName = imageUrl.split('/').pop().split('?')[0];
    console.log('🗑️ Deleting:', fileName);

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-from-r2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName })
    });

    return response.ok;
  } catch (error) {
    console.error('❌ Delete failed:', error);
    return false;
  }
};

// Batch delete
export const batchDeleteFromR2 = async (imageUrls) => {
  let success = 0;
  let failed = 0;
  
  for (const url of imageUrls) {
    const result = await deleteFromR2(url);
    if (result) success++;
    else failed++;
  }
  
  return { success, failed };
};

// Validation (simplified)
export const validateR2Config = () => {
  if (!R2_PUBLIC_URL || R2_PUBLIC_URL === 'undefined') {
    throw new Error('VITE_R2_PUBLIC_URL is not configured');
  }
  if (!R2_PUBLIC_URL.startsWith('https://')) {
    throw new Error('VITE_R2_PUBLIC_URL must start with https://');
  }
};