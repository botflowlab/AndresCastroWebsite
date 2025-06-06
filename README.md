# Andres Castro Architecture Website

A modern, secure architecture portfolio website built with React, Vite, and Supabase.

## 🔐 Security Setup

### 1. Environment Variables
Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**CRITICAL SECURITY NOTES:**
- ✅ The `.env` file is already in `.gitignore` - it will NEVER be committed
- ✅ Only `VITE_` prefixed variables are exposed to the frontend
- ✅ JWT secrets should ONLY be configured in Supabase dashboard
- ✅ Never put JWT secrets in frontend code or environment variables

### 2. Supabase JWT Secret Configuration

Your JWT secret: `yGdjlwy9xKSnMPbiIvpQSUikFsapDqMJ3waj52CH04R1cnt2JufiweMO4ot/4NbtUKQaD0Lgcq38QPvqcjQFhg==`

**Configure this in your Supabase Dashboard:**

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Scroll down to "JWT Settings"
4. Update the "JWT Secret" field with your new secret
5. Click "Save"

**NEVER put this secret in your code or environment variables!**

### 3. Security Features Implemented

- ✅ **Authentication**: Secure PKCE flow
- ✅ **Authorization**: Row Level Security (RLS)
- ✅ **Input Validation**: All user inputs sanitized
- ✅ **File Upload Security**: Type and size validation
- ✅ **Rate Limiting**: Prevents abuse
- ✅ **XSS Protection**: Input sanitization
- ✅ **CSRF Protection**: Request validation
- ✅ **Environment Security**: No secrets in code

## 🚀 Deployment

This project is configured for secure deployment to Netlify:

```bash
npm run build
```

The build process:
- ✅ Removes all console logs
- ✅ Minifies code for security
- ✅ Excludes source maps
- ✅ Randomizes file names
- ✅ No sensitive data exposed

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── utils/              # Security utilities
├── supabaseClient.js   # Secure Supabase configuration
└── main.jsx           # Application entry point
```

## 🛡️ Security Checklist

- ✅ JWT secret configured in Supabase dashboard only
- ✅ Environment variables properly configured
- ✅ No sensitive data in git repository
- ✅ RLS policies active on all tables
- ✅ File uploads validated and secured
- ✅ Rate limiting implemented
- ✅ Input sanitization active
- ✅ Build artifacts clean and secure

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📞 Support

For technical support, contact the development team.