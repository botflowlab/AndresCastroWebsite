# Cloudflare R2 CORS Configuration

## Required CORS Settings

To allow your website to access images from your R2 bucket, you need to configure CORS (Cross-Origin Resource Sharing) settings.

### Step 1: Access Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Select your bucket: `andres-castro-images`
4. Go to **Settings** tab
5. Find **CORS Policy** section

### Step 2: Add CORS Configuration

Add the following CORS policy to your R2 bucket:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-domain.com",
      "https://*.netlify.app",
      "https://*.vercel.app"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposedHeaders": [
      "ETag",
      "Content-Length",
      "Content-Type"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

### Step 3: Update for Production

When you deploy your website, replace `"https://your-domain.com"` with your actual domain.

### Step 4: Verify CORS is Working

After applying the CORS policy:

1. Wait 5-10 minutes for changes to propagate
2. Test image loading in your browser
3. Check browser console for CORS errors
4. Use browser dev tools Network tab to verify requests

### Common CORS Issues

1. **Missing Origin**: Make sure your domain is in `AllowedOrigins`
2. **Wrong Methods**: Ensure `GET` and `HEAD` are in `AllowedMethods`
3. **Propagation Delay**: CORS changes can take up to 10 minutes to take effect
4. **Cache Issues**: Clear browser cache and try in incognito mode

### Testing CORS

You can test CORS with curl:

```bash
curl -H "Origin: https://your-domain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/test-image.jpg
```

### Alternative: Use Custom Domain

For better performance and to avoid CORS issues entirely, consider setting up a custom domain for your R2 bucket:

1. Go to your R2 bucket settings
2. Click **Connect Domain**
3. Add a subdomain like `images.your-domain.com`
4. Update your `VITE_R2_PUBLIC_URL` to use the custom domain

This eliminates CORS issues since the images will be served from the same domain as your website.