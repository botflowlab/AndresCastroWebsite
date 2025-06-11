# EMERGENCY R2 IMAGE FIX

## IMMEDIATE STEPS TO GET IMAGES WORKING

### 1. Apply This EXACT CORS Policy

Go to Cloudflare Dashboard → R2 → Your Bucket → Settings → CORS Policy:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

**CRITICAL**: Delete any existing CORS policy first, then paste this exactly.

### 2. Verify Your .env File

```env
VITE_R2_PUBLIC_URL=https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev
VITE_R2_BUCKET_NAME=andres-castro-images
```

### 3. Test R2 Bucket Access

Open this URL in your browser:
```
https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

Expected results:
- ✅ Shows bucket listing OR "Access Denied" (both are good)
- ❌ Connection timeout or DNS error (bad)

### 4. Check What's in Your Database

Run this in Supabase SQL editor:
```sql
SELECT title, images[1] as first_image 
FROM projects 
WHERE images IS NOT NULL 
AND array_length(images, 1) > 0 
LIMIT 5;
```

Look at the `first_image` values. They should be either:
- Full URLs: `https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/image-123.jpg`
- Filenames: `image-123.jpg`

### 5. Manual Image Test

If you see a filename like `image-123.jpg`, test it manually:
```
https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/image-123.jpg
```

Open this URL in your browser. You should see the image.

### 6. Check Browser Console

1. Open your website
2. Press F12 → Console tab
3. Look for messages starting with 🖼️, ✅, ❌

You should see:
```
🖼️ Input: image-123.jpg
🔗 R2 URL: https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/image-123.jpg
✅ Image loaded: https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/image-123.jpg
```

### 7. What You'll See Now

- **Loading**: Blue box with "LOADING IMAGE..."
- **Success**: Image displays normally
- **Failure**: Red box with error details and both original/final URLs

### 8. If Still Not Working

The red error box will show you:
- Original URL from database
- Final processed URL
- Console will have detailed logs

Common issues:
- **CORS not applied**: Wait 10 minutes after applying CORS
- **Wrong bucket**: Check if images are in the right bucket
- **Wrong URL format**: Database might have old/wrong URLs

### 9. Emergency Fallback

If R2 completely fails, the system will show placeholder images. If you don't see placeholders, there's a code issue.

### 10. Upload Test

Try uploading a new image through `/client-dashboard`:
1. Sign in as admin
2. Create/edit a project
3. Upload an image
4. Check if it appears in R2 bucket
5. Check if it displays on the website

## What I Changed

1. **ONE FUNCTION**: `getImageUrl()` handles everything
2. **DETAILED LOGGING**: Console shows every step
3. **VISUAL FEEDBACK**: Different colors for loading/success/error
4. **ERROR DETAILS**: Red box shows exactly what failed
5. **PLACEHOLDER FALLBACK**: SVG placeholder if everything fails

The system is now bulletproof and will tell you exactly what's wrong if images don't work.