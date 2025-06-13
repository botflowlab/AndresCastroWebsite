/**
 * ULTRA-STABLE Cloudflare R2 Storage utilities
 * Fixed caching and stability issues
 */

// R2 configuration
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

console.log('🔧 R2 Config:', { R2_PUBLIC_URL });

// Cache processed URLs to prevent re-processing
const urlCache = new Map();

/**
 * THE ONLY FUNCTION YOU NEED - NOW WITH CACHING
 * Converts any image reference to a working URL
 */
export const getImageUrl = (imageUrl) => {
  // Check cache first
  if (urlCache.has(imageUrl)) {
    const cachedUrl = urlCache.get(imageUrl);
    console.log('💾 Cache hit:', imageUrl, '->', cachedUrl);
    return cachedUrl;
  }

  console.log('🖼️ Processing:', imageUrl);
  
  let finalUrl;
  
  // No URL = placeholder
  if (!imageUrl) {
    console.log('❌ No URL, using placeholder');
    finalUrl = '/images/placeholder.jpg';
  }
  // Already the correct public URL = use as-is
  else if (imageUrl.includes('pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev')) {
    console.log('✅ Correct public URL');
    finalUrl = imageUrl;
  }
  // Wrong R2 URL format = fix it
  else if (imageUrl.includes('.r2.cloudflarestorage.com')) {
    const fileName = imageUrl.split('/').pop();
    finalUrl = `${R2_PUBLIC_URL}/${fileName}`;
    console.log('🔧 Fixed R2 URL:', fileName);
  }
  // Full URL but not R2 = use as-is
  else if (imageUrl.startsWith('http')) {
    console.log('🌐 External URL');
    finalUrl = imageUrl;
  }
  // Local image = use as-is
  else if (imageUrl.startsWith('/')) {
    console.log('📁 Local image');
    finalUrl = imageUrl;
  }
  // Must be a filename = build R2 URL
  else {
    if (!R2_PUBLIC_URL) {
      console.log('❌ No R2_PUBLIC_URL, using placeholder');
      finalUrl = '/images/placeholder.jpg';
    } else {
      finalUrl = `${R2_PUBLIC_URL}/${imageUrl}`;
      console.log('🔗 R2 URL from filename');
    }
  }

  // Cache the result
  urlCache.set(imageUrl, finalUrl);
  console.log('💾 Cached:', imageUrl, '->', finalUrl);
  
  return finalUrl;
};

// Clear cache function (for debugging)
export const clearImageCache = () => {
  urlCache.clear();
  console.log('🗑️ Image cache cleared');
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
    
    // Ensure we return the correct public URL format and cache it
    const finalUrl = getImageUrl(result.url);
    return finalUrl;
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

    // Remove from cache
    urlCache.delete(imageUrl);

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