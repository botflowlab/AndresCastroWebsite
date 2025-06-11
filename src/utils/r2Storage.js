/**
 * Cloudflare R2 Storage utilities
 * Handles image uploads, deletions, and URL generation
 */

// R2 configuration from environment variables
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;
const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME;

// Validate R2 configuration
export const validateR2Config = () => {
  console.log('R2 Config Check:', {
    R2_PUBLIC_URL: R2_PUBLIC_URL ? 'Set' : 'Missing',
    R2_BUCKET_NAME: R2_BUCKET_NAME ? 'Set' : 'Missing',
    actualUrl: R2_PUBLIC_URL,
    actualBucket: R2_BUCKET_NAME
  });

  if (!R2_PUBLIC_URL || R2_PUBLIC_URL === 'undefined' || R2_PUBLIC_URL.trim() === '') {
    throw new Error('VITE_R2_PUBLIC_URL is not configured. Please check your .env file and ensure VITE_R2_PUBLIC_URL is set.');
  }
  
  if (!R2_BUCKET_NAME || R2_BUCKET_NAME === 'undefined' || R2_BUCKET_NAME.trim() === '') {
    throw new Error('VITE_R2_BUCKET_NAME is not configured. Please check your .env file and ensure VITE_R2_BUCKET_NAME is set.');
  }
  
  if (!R2_PUBLIC_URL.startsWith('https://')) {
    throw new Error('VITE_R2_PUBLIC_URL must start with https://. Current value: ' + R2_PUBLIC_URL);
  }
};

/**
 * Check if a URL is an R2 URL
 * @param {string} url - The URL to check
 * @returns {boolean} - Whether the URL is from R2
 */
export const isR2Url = (url) => {
  if (!url || !R2_PUBLIC_URL) return false;
  return url.includes(R2_PUBLIC_URL) || url.includes('.r2.cloudflarestorage.com');
};

/**
 * Extract filename from URL (works for both R2 and other URLs)
 * @param {string} url - The image URL
 * @returns {string} - The filename
 */
export const extractFilename = (url) => {
  if (!url) return '';
  try {
    return url.split('/').pop().split('?')[0];
  } catch {
    return '';
  }
};

/**
 * Convert any image URL to proper R2 URL format
 * @param {string} imageUrl - The image URL (could be filename or full URL)
 * @returns {string} - Proper R2 URL
 */
export const normalizeImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If it's already a full R2 URL, return as-is
  if (isR2Url(imageUrl)) {
    return imageUrl;
  }
  
  // If it's a filename or relative path, construct R2 URL
  let fileName = imageUrl;
  
  // Remove leading slash if present
  if (fileName.startsWith('/')) {
    fileName = fileName.substring(1);
  }
  
  // If it's just a filename, construct the full R2 URL
  if (!fileName.startsWith('http')) {
    return `${R2_PUBLIC_URL}/${fileName}`;
  }
  
  // If it's some other URL format, try to extract filename and construct R2 URL
  const extractedFilename = extractFilename(imageUrl);
  if (extractedFilename) {
    return `${R2_PUBLIC_URL}/${extractedFilename}`;
  }
  
  return imageUrl; // Fallback to original
};

/**
 * Generate optimized image URL with Cloudflare Image Resizing
 * @param {string} imageUrl - The full image URL or filename
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
  if (!imageUrl) return '';
  
  // First normalize the URL to ensure it's a proper R2 URL
  const normalizedUrl = normalizeImageUrl(imageUrl);
  
  // If normalization failed, return original
  if (!normalizedUrl || !isR2Url(normalizedUrl)) {
    return imageUrl;
  }
  
  const {
    width = null,
    height = null,
    quality = 85,
    format = 'auto',
    fit = 'cover'
  } = options;

  // Start with the normalized R2 URL
  let url = normalizedUrl;

  // Add Cloudflare Image Resizing parameters if available
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality !== 85) params.append('quality', quality.toString());
  if (format !== 'auto') params.append('format', format);
  if (fit !== 'cover') params.append('fit', fit);

  // If we have optimization parameters, add them as query params
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
};

/**
 * Generate a unique file name for uploads
 * @param {File} file - The file to upload
 * @param {string} prefix - Optional prefix for the file name
 * @returns {string} - Unique file name
 */
export const generateFileName = (file, prefix = 'image') => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 9);
  const fileExt = file.name.split('.').pop().toLowerCase();
  
  return `${prefix}-${timestamp}-${randomString}.${fileExt}`;
};

/**
 * Upload image to R2 via Supabase Edge Function
 * @param {File} file - The file to upload
 * @param {string} fileType - Type of file (project, blueprint, etc.)
 * @param {Function} setUploadProgress - Progress callback
 * @returns {Promise<string>} - The uploaded file URL
 */
export const uploadToR2 = async (file, fileType = 'image', setUploadProgress = () => {}) => {
  try {
    // Validate configuration before attempting upload
    validateR2Config();
    
    // Generate unique filename
    const fileName = generateFileName(file, fileType);
    
    // Create FormData for upload
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
      
      // Provide more specific error messages based on the error type
      if (errorData.error && errorData.error.includes('R2 configuration is incomplete')) {
        throw new Error('R2 Storage is not properly configured. Please contact the administrator to set up the required R2 environment variables in Supabase Edge Functions.');
      }
      
      throw new Error(errorData.error || `Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    setUploadProgress(100);
    
    // Ensure we return a properly formatted R2 URL
    return normalizeImageUrl(result.url);
  } catch (error) {
    console.error('Error uploading to R2:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('R2 configuration is incomplete')) {
      throw new Error('R2 Storage configuration error. Please ensure all R2 environment variables are set in your Supabase project settings under Edge Functions.');
    }
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error occurred while uploading. Please check your internet connection and try again.');
    }
    
    throw error;
  }
};

/**
 * Delete image from R2 via Supabase Edge Function
 * @param {string} imageUrl - The URL of the image to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFromR2 = async (imageUrl) => {
  try {
    if (!imageUrl) {
      console.warn('No image URL provided for deletion');
      return false;
    }

    // Extract filename from URL (works for both R2 URLs and filenames)
    const fileName = extractFilename(imageUrl);
    
    if (!fileName) {
      console.warn('Could not extract filename from URL:', imageUrl);
      return false;
    }

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
      
      // Provide more specific error messages
      if (errorData.error && errorData.error.includes('R2 configuration is incomplete')) {
        throw new Error('R2 Storage is not properly configured. Please contact the administrator to set up the required R2 environment variables in Supabase Edge Functions.');
      }
      
      throw new Error(errorData.error || `Delete failed with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('R2 configuration is incomplete')) {
      console.error('R2 Storage configuration error. Please ensure all R2 environment variables are set in your Supabase project settings under Edge Functions.');
    }
    
    return false;
  }
};

/**
 * Batch upload multiple files to R2
 * @param {File[]} files - Array of files to upload
 * @param {string} fileType - Type of files
 * @param {Function} setUploadProgress - Progress callback
 * @returns {Promise<string[]>} - Array of uploaded file URLs
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
 * Batch delete multiple files from R2
 * @param {string[]} imageUrls - Array of image URLs to delete
 * @returns {Promise<{success: number, failed: number}>} - Deletion results
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

/**
 * Get thumbnail URL for an image
 * @param {string} imageUrl - Original image URL
 * @returns {string} - Thumbnail URL
 */
export const getThumbnailUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  return getOptimizedImageUrl(imageUrl, {
    width: 300,
    height: 200,
    quality: 70,
    format: 'webp'
  });
};

/**
 * Get responsive image URLs for different screen sizes
 * @param {string} imageUrl - Original image URL
 * @returns {Object} - Object with different sized URLs
 */
export const getResponsiveImageUrls = (imageUrl) => {
  if (!imageUrl) return {};
  
  return {
    thumbnail: getOptimizedImageUrl(imageUrl, { width: 300, height: 200, quality: 70 }),
    small: getOptimizedImageUrl(imageUrl, { width: 600, height: 400, quality: 80 }),
    medium: getOptimizedImageUrl(imageUrl, { width: 1200, height: 800, quality: 85 }),
    large: getOptimizedImageUrl(imageUrl, { width: 1920, height: 1280, quality: 90 }),
    original: normalizeImageUrl(imageUrl)
  };
};

/**
 * Test image URL accessibility
 * @param {string} imageUrl - The image URL to test
 * @returns {Promise<boolean>} - Whether the image is accessible
 */
export const testImageUrl = async (imageUrl) => {
  if (!imageUrl) return false;
  
  try {
    const normalizedUrl = normalizeImageUrl(imageUrl);
    const response = await fetch(normalizedUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn('Image URL test failed:', imageUrl, error);
    return false;
  }
};

/**
 * Get fallback image URL if primary fails
 * @param {string} primaryUrl - Primary image URL
 * @param {string} fallbackUrl - Fallback image URL
 * @returns {Promise<string>} - Working image URL
 */
export const getWorkingImageUrl = async (primaryUrl, fallbackUrl = '/images/placeholder.jpg') => {
  if (!primaryUrl) return fallbackUrl;
  
  const normalizedUrl = normalizeImageUrl(primaryUrl);
  const isAccessible = await testImageUrl(normalizedUrl);
  
  return isAccessible ? normalizedUrl : fallbackUrl;
};