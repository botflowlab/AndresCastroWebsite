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
 * Generate optimized image URL with Cloudflare Image Resizing
 * @param {string} fileName - The file name in R2
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (fileName, options = {}) => {
  if (!fileName) return '';
  
  const {
    width = null,
    height = null,
    quality = 85,
    format = 'auto',
    fit = 'cover'
  } = options;

  // Base R2 URL
  let url = `${R2_PUBLIC_URL}/${fileName}`;

  // Add Cloudflare Image Resizing parameters if available
  // Note: This requires Cloudflare Image Resizing to be enabled
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality !== 85) params.append('quality', quality.toString());
  if (format !== 'auto') params.append('format', format);
  if (fit !== 'cover') params.append('fit', fit);

  // If we have optimization parameters, use Cloudflare's image resizing
  if (params.toString()) {
    // This assumes you have Cloudflare Image Resizing enabled
    // Format: https://imagedelivery.net/your-account-hash/image-id/variant-name
    // For now, we'll just return the direct URL and add optimization later
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
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    setUploadProgress(100);
    
    return result.url;
  } catch (error) {
    console.error('Error uploading to R2:', error);
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
    if (!imageUrl || !imageUrl.includes(R2_PUBLIC_URL)) {
      console.warn('Invalid R2 URL for deletion:', imageUrl);
      return false;
    }

    // Extract filename from URL
    const fileName = imageUrl.split('/').pop().split('?')[0]; // Remove query params

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
      throw new Error(errorData.error || 'Delete failed');
    }

    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
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
  
  const fileName = imageUrl.split('/').pop().split('?')[0];
  return getOptimizedImageUrl(fileName, {
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
  
  const fileName = imageUrl.split('/').pop().split('?')[0];
  
  return {
    thumbnail: getOptimizedImageUrl(fileName, { width: 300, height: 200, quality: 70 }),
    small: getOptimizedImageUrl(fileName, { width: 600, height: 400, quality: 80 }),
    medium: getOptimizedImageUrl(fileName, { width: 1200, height: 800, quality: 85 }),
    large: getOptimizedImageUrl(fileName, { width: 1920, height: 1280, quality: 90 }),
    original: imageUrl
  };
};