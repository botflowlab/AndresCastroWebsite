import { createClient } from '@supabase/supabase-js';
import { validateEnvironment } from './utils/security';

// Validate environment variables on startup
validateEnvironment();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with security options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // Use PKCE flow for better security
  },
  global: {
    headers: {
      'X-Client-Info': 'andres-castro-website'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add request interceptor for additional security
const originalRequest = supabase.rest.fetch;
supabase.rest.fetch = async (url, options = {}) => {
  // Add security headers
  const secureOptions = {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  };

  return originalRequest.call(supabase.rest, url, secureOptions);
};

// Monitor auth state changes for security
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any cached data
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear();
  }
  
  if (event === 'TOKEN_REFRESHED') {
    console.log('Auth token refreshed successfully');
  }
});