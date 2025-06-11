# ULTRA-SIMPLE R2 Setup Guide

## Step 1: Apply This CORS Policy

Go to your Cloudflare R2 bucket settings and use this EXACT CORS policy:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"]
  }
]
```

**IMPORTANT**: 
- Remove any existing CORS policy first
- Copy-paste exactly as shown above
- Save and wait 5 minutes

## Step 2: Verify Your .env File

Make sure your `.env` file has:

```env
VITE_R2_PUBLIC_URL=https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev
VITE_R2_BUCKET_NAME=andres-castro-images
```

## Step 3: Test R2 Access

Open this URL in your browser:
```
https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

You should see either:
- ✅ A bucket listing
- ✅ An "Access Denied" message (this is normal)
- ❌ NOT a connection timeout or DNS error

## Step 4: Check Console Logs

1. Open your website
2. Press F12 to open developer tools
3. Go to Console tab
4. Look for messages starting with 🖼️, ✅, or ❌

You should see:
```
🖼️ Processing image URL: [your-image-url]
✅ Full URL detected: [processed-url]
```

## Step 5: Test Image Upload

1. Go to `/client-dashboard`
2. Sign in with your admin account
3. Try uploading a new image
4. Check if it appears in your R2 bucket
5. Check if it displays on the website

## If Images Still Don't Work

### Check Database URLs
Run this in Supabase SQL editor:
```sql
SELECT title, images[1] as first_image 
FROM projects 
WHERE images IS NOT NULL 
LIMIT 3;
```

The URLs should look like:
- ✅ `https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/image-123456.jpg`
- ✅ `image-123456.jpg` (will be converted automatically)
- ❌ `https://some-other-domain.com/image.jpg`

### Manual Test
In browser console, run:
```javascript
fetch('https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/', {method: 'HEAD'})
  .then(r => console.log('✅ R2 accessible:', r.status))
  .catch(e => console.log('❌ R2 error:', e))
```

## What Changed

I completely simplified the R2 implementation:

1. **One Function**: `getImageUrl()` handles all URL processing
2. **Smart Detection**: Automatically detects if URL is already complete
3. **Better Logging**: Console shows exactly what's happening
4. **Fallback System**: Uses placeholder if images fail
5. **No Complex Optimization**: Just basic URL handling

The new system is much more reliable and easier to debug.