# R2 Image Display Debug Guide

## Quick Debug Steps

### 1. Check Your .env File
Make sure these are set correctly:
```env
VITE_R2_PUBLIC_URL=https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev
VITE_R2_BUCKET_NAME=andres-castro-images
```

### 2. Test R2 URL Directly
Open this URL in your browser:
```
https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

You should see either:
- A bucket listing (if public)
- An access denied message (normal)
- NOT a connection error

### 3. Check Browser Console
1. Open browser dev tools (F12)
2. Go to Console tab
3. Look for these messages:
   - "Normalizing URL: [your-image-url]"
   - "Testing image URL: [normalized-url]"
   - "Image test result: true/false"

### 4. Test Individual Image
If you have an image URL from your database, test it:
```javascript
// In browser console
fetch('https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/your-image-name.jpg', {method: 'HEAD'})
  .then(r => console.log('Status:', r.status, r.ok))
  .catch(e => console.error('Error:', e))
```

### 5. Common Issues & Solutions

#### Issue: CORS Errors
**Solution**: Apply the minimal CORS policy:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"]
  }
]
```

#### Issue: Images Return 404
**Possible causes**:
- Images were uploaded to different bucket
- Images have different filenames than stored in database
- R2 public URL is wrong

**Debug**:
1. Check your Cloudflare R2 dashboard
2. Verify bucket name matches `VITE_R2_BUCKET_NAME`
3. Check if files exist in the bucket

#### Issue: Images Load Slowly
**Solution**: This is normal for R2. Images may take 2-3 seconds to load initially.

#### Issue: Mixed Content (HTTP/HTTPS)
**Solution**: Ensure `VITE_R2_PUBLIC_URL` starts with `https://`

### 6. Database Check
Run this in your Supabase SQL editor:
```sql
SELECT title, images[1] as first_image 
FROM projects 
WHERE images IS NOT NULL 
AND array_length(images, 1) > 0 
LIMIT 5;
```

This shows you the actual image URLs stored in your database.

### 7. Force Refresh
After making changes:
1. Clear browser cache (Ctrl+Shift+R)
2. Restart dev server (`npm run dev`)
3. Wait 5 minutes for R2 CORS changes to propagate

### 8. Fallback Test
If R2 images don't work, the app should show placeholder images from `/images/placeholder.jpg`. If you don't see placeholders, there's a code issue.

## Expected Behavior
- Images should load within 2-3 seconds
- Failed images should show placeholder with error icon
- Console should show detailed logging about URL normalization
- No CORS errors in browser console

## Still Not Working?
1. Check if you can upload new images through the admin dashboard
2. Verify the uploaded images appear in your R2 bucket
3. Test the new image URLs directly in browser
4. If new uploads work but old images don't, there may be a URL format mismatch