/**
 * Security utilities for the application
 * 
 * IMPORTANT: JWT secrets should NEVER be in frontend code!
 * They should only be configured in the Supabase dashboard.
 */

// Validate environment variables
export const validateEnvironment = () => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate URL format
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    throw new Error('Invalid Supabase URL format');
  }

  // Validate anon key format (should start with 'eyJ')
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!anonKey.startsWith('eyJ')) {
    throw new Error('Invalid Supabase anon key format');
  }

  // Security check: Ensure no JWT secrets in environment
  const envVars = Object.keys(import.meta.env);
  const suspiciousVars = envVars.filter(key => 
    key.toLowerCase().includes('jwt') || 
    key.toLowerCase().includes('secret') ||
    key.toLowerCase().includes('service_role')
  );

  if (suspiciousVars.length > 0) {
    console.warn('⚠️ WARNING: Potential sensitive variables detected:', suspiciousVars);
    console.warn('🔒 JWT secrets should only be in Supabase dashboard, not in frontend code!');
  }
};

// Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

// Validate file uploads with enhanced security (NOW WITH VIDEO SUPPORT)
export const validateFileUpload = (file) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
  
  const imageMaxSize = 10 * 1024 * 1024; // 10MB for images
  const videoMaxSize = 50 * 1024 * 1024; // 50MB for videos
  
  const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const allowedVideoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
  const allowedExtensions = [...allowedImageExtensions, ...allowedVideoExtensions];

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP images and MP4, WebM, MOV, AVI videos are allowed.');
  }

  // Check file extension
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Invalid file extension.');
  }

  // Check file size based on type
  const isVideo = allowedVideoTypes.includes(file.type);
  const maxSize = isVideo ? videoMaxSize : imageMaxSize;
  const sizeLabel = isVideo ? '50MB' : '10MB';
  
  if (file.size > maxSize) {
    throw new Error(`File size too large. Maximum size is ${sizeLabel} for ${isVideo ? 'videos' : 'images'}.`);
  }

  // Check for suspicious file names
  const suspiciousPatterns = ['.php', '.js', '.html', '.exe', '.bat', '.sh'];
  if (suspiciousPatterns.some(pattern => file.name.toLowerCase().includes(pattern))) {
    throw new Error('File name contains suspicious content.');
  }

  return true;
};

// Enhanced rate limiting helper
export const createRateLimiter = (maxRequests = 10, windowMs = 60000) => {
  const requests = new Map();

  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old requests
    for (const [key, timestamps] of requests.entries()) {
      requests.set(key, timestamps.filter(time => time > windowStart));
      if (requests.get(key).length === 0) {
        requests.delete(key);
      }
    }

    // Check current requests
    const userRequests = requests.get(identifier) || [];
    
    if (userRequests.length >= maxRequests) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Add current request
    userRequests.push(now);
    requests.set(identifier, userRequests);

    return true;
  };
};

// Content Security Policy headers
export const getCSPHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com",
      "font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https: blob:",
      "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co wss://*.supabase.in",
      "frame-src 'self' https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  };
};

// Validate JWT token format (for debugging only - never store JWT secrets in frontend!)
export const validateJWTFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // JWT should have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  try {
    // Try to decode the header (first part)
    const header = JSON.parse(atob(parts[0]));
    return header.alg && header.typ === 'JWT';
  } catch {
    return false;
  }
};

// Security audit function
export const performSecurityAudit = () => {
  const issues = [];

  // Check environment variables
  try {
    validateEnvironment();
  } catch (error) {
    issues.push(`Environment: ${error.message}`);
  }

  // Check for development mode in production
  if (import.meta.env.PROD && import.meta.env.DEV) {
    issues.push('Development mode detected in production build');
  }

  // Check for console statements in production
  if (import.meta.env.PROD && typeof console.log === 'function') {
    // This is expected in production, but we log it for awareness
    console.info('🔒 Security: Console logging is available (normal in production)');
  }

  return {
    passed: issues.length === 0,
    issues,
    timestamp: new Date().toISOString()
  };
};