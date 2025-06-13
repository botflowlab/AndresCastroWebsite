/**
 * ULTRA-STABLE Cloudflare R2 Storage utilities
 * Fixed caching and stability issues
 * NOW WITH VIDEO SUPPORT
 */

// R2 configuration
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

console.log('🔧 R2 Config:', { R2_PUBLIC_URL });

// Cache processed URLs to prevent re-processing
const urlCache = new Map();

/**
 * Check if a file is a video based on its URL or MIME type
 */
export const isVideoFile = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.includes(ext));
};

/**
 * Get media type (image or video) from URL
 */
export const getMediaType = (url) => {
  return isVideoFile(url) ? 'video' : 'image';
};

/**
 * THE ONLY FUNCTION YOU NEED - NOW WITH CACHING AND VIDEO SUPPORT
 * Converts any image/video reference to a working URL
 */
export const getImageUrl = (mediaUrl) => {
  // Check cache first
  if (urlCache.has(mediaUrl)) {
    const cachedUrl = urlCache.get(mediaUrl);
    console.log('💾 Cache hit:', mediaUrl, '->', cachedUrl);
    return cachedUrl;
  }

  console.log('🖼️ Processing:', mediaUrl);
  
  let finalUrl;
  
  // No URL = placeholder
  if (!mediaUrl) {
    console.log('❌ No URL, using placeholder');
    finalUrl = '/images/placeholder.jpg';
  }
  // Already the correct public URL = use as-is
  else if (mediaUrl.includes('pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev')) {
    console.log('✅ Correct public URL');
    finalUrl = mediaUrl;
  }
  // Wrong R2 URL format = fix it
  else if (mediaUrl.includes('.r2.cloudflarestorage.com')) {
    const fileName = mediaUrl.split('/').pop();
    finalUrl = `${R2_PUBLIC_URL}/${fileName}`;
    console.log('🔧 Fixed R2 URL:', fileName);
  }
  // Full URL but not R2 = use as-is
  else if (mediaUrl.startsWith('http')) {
    console.log('🌐 External URL');
    finalUrl = mediaUrl;
  }
  // Local image = use as-is
  else if (mediaUrl.startsWith('/')) {
    console.log('📁 Local media');
    finalUrl = mediaUrl;
  }
  // Must be a filename = build R2 URL
  else {
    if (!R2_PUBLIC_URL) {
      console.log('❌ No R2_PUBLIC_URL, using placeholder');
      finalUrl = '/images/placeholder.jpg';
    } else {
      finalUrl = `${R2_PUBLIC_URL}/${mediaUrl}`;
      console.log('🔗 R2 URL from filename');
    }
  }

  // Cache the result
  urlCache.set(mediaUrl, finalUrl);
  console.log('💾 Cached:', mediaUrl, '->', finalUrl);
  
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

// Upload function (enhanced for video support)
export const uploadToR2 = async (file, fileType = 'image', setUploadProgress = () => {}) => {
  try {
    console.log('📤 Uploading:', file.name, 'Type:', file.type);
    
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 9);
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // Determine if it's a video file
    const isVideo = file.type.startsWith('video/') || isVideoFile(file.name);
    const actualFileType = isVideo ? 'video' : fileType;
    
    const fileName = `${actualFileType}-${timestamp}-${randomString}.${fileExt}`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileType', actualFileType);

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
    
    console.log('✅ Upload success:', result.url, 'Type:', actualFileType);
    
    // Ensure we return the correct public URL format and cache it
    const finalUrl = getImageUrl(result.url);
    return finalUrl;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
};

// Batch upload (enhanced for mixed media)
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

// Delete function (works for both images and videos)
export const deleteFromR2 = async (mediaUrl) => {
  try {
    if (!mediaUrl) return false;
    
    const fileName = mediaUrl.split('/').pop().split('?')[0];
    console.log('🗑️ Deleting:', fileName);

    // Remove from cache
    urlCache.delete(mediaUrl);

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

// Batch delete (works for mixed media)
export const batchDeleteFromR2 = async (mediaUrls) => {
  let success = 0;
  let failed = 0;
  
  for (const url of mediaUrls) {
    const result = await deleteFromR2(url);
    if (result) success++;
    else failed++;
  }
  
  return { success, failed };
};

// Validation (enhanced for video support)
export const validateR2Config = () => {
  if (!R2_PUBLIC_URL || R2_PUBLIC_URL === 'undefined') {
    throw new Error('VITE_R2_PUBLIC_URL is not configured');
  }
  if (!R2_PUBLIC_URL.startsWith('https://')) {
    throw new Error('VITE_R2_PUBLIC_URL must start with https://');
  }
};