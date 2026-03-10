import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { sanitizeInput, createRateLimiter } from '../../utils/security';
import Dashboard from '../admin/Dashboard';

// List of allowed email addresses - NEVER expose service role keys
const ALLOWED_EMAILS = ['arquiteccr@gmail.com', 'nunezdilanv@gmail.com'];

// Rate limiter for auth attempts
const authRateLimiter = createRateLimiter(5, 300000); // 5 attempts per 5 minutes

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('login');
  const [session, setSession] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Clear sensitive data on sign out
      if (!session) {
        setEmail('');
        setPassword('');
        setError(null);
        setAttempts(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateInput = () => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      throw new Error('Email and password are required');
    }

    if (sanitizedEmail.length > 100) {
      throw new Error('Email is too long');
    }

    if (sanitizedPassword.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (sanitizedPassword.length > 100) {
      throw new Error('Password is too long');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }

    return { sanitizedEmail, sanitizedPassword };
  };

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Rate limiting
      authRateLimiter(email);

      const { sanitizedEmail, sanitizedPassword } = validateInput();

      if (!ALLOWED_EMAILS.includes(sanitizedEmail)) {
        throw new Error('Registration is not allowed for this email address');
      }

      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: sanitizedPassword,
        options: {
          emailRedirectTo: window.location.origin + '/client-dashboard'
        }
      });

      if (error) throw error;
      
      alert('Check your email for the confirmation link!');
    } catch (error) {
      setError(error.message);
      setAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Rate limiting
      authRateLimiter(email);

      const { sanitizedEmail, sanitizedPassword } = validateInput();

      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (error) {
        setAttempts(prev => prev + 1);
        throw error;
      }

      // Reset attempts on successful login
      setAttempts(0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all local data
      localStorage.clear();
      sessionStorage.clear();
      
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // If user is authenticated, show dashboard
  if (session) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {session.user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
          <Dashboard />
        </div>
      </div>
    );
  }

  // Show auth form
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Admin Sign In' : 'Create Admin Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === 'login' ? 'Access the admin dashboard' : 'Register for admin access'}
          </p>
        </div>

        <form onSubmit={mode === 'login' ? handleSignIn : handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              required
              maxLength={100}
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              required
              minLength={6}
              maxLength={100}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {mode === 'register' && (
              <p className="text-xs text-gray-600 mt-1">
                Minimum 6 characters required
              </p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{error}</p>
              {attempts >= 3 && (
                <p className="text-red-500 text-xs mt-1">
                  Multiple failed attempts detected. Please wait before trying again.
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || attempts >= 5}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading 
              ? (mode === 'login' ? 'Signing in...' : 'Creating account...') 
              : (mode === 'login' ? 'Sign In' : 'Create Account')
            }
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError(null);
              setAttempts(0);
            }}
            className="text-sm text-gray-600 hover:text-black"
            disabled={loading}
          >
            {mode === 'login'
              ? "Need an account? Register here"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Security notice */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-xs">
            🔒 This is a secure admin area. Only authorized personnel can access this dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}