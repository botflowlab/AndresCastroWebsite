# Complete Cloudflare R2 Troubleshooting Guide

## Overview
This guide will help you set up and troubleshoot Cloudflare R2 storage for your image hosting needs. Follow these steps in order to ensure everything works correctly.

## Step 1: Cloudflare R2 Bucket Setup

### 1.1 Create R2 Bucket
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Click **Create bucket**
4. Name your bucket: `andres-castro-images`
5. Choose a location close to your users
6. Click **Create bucket**

### 1.2 Get R2 API Credentials
1. In Cloudflare Dashboard, go to **R2 Object Storage**
2. Click **Manage R2 API tokens**
3. Click **Create API token**
4. Configure permissions:
   - **Permissions**: Object Read & Write
   - **Bucket**: Select your bucket or use "All buckets"
   - **TTL**: Set as needed (or leave blank for no expiration)
5. Click **Create API token**
6. **IMPORTANT**: Copy and save these credentials:
   - Account ID
   - Access Key ID
   - Secret Access Key

### 1.3 Get Public URL
1. Go to your R2 bucket
2. Click **Settings**
3. Find **Public URL** section
4. Your public URL will be: `https://pub-[random-string].r2.dev`
5. Copy this URL for later use

## Step 2: CORS Configuration

### 2.1 Configure CORS Policy
1. In your R2 bucket, go to **Settings** tab
2. Find **CORS Policy** section
3. Click **Add CORS policy**
4. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "https://your-production-domain.com",
      "https://*.netlify.app",
      "https://*.vercel.app",
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE",
      "OPTIONS"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposedHeaders": [
      "ETag",
      "Content-Length",
      "Content-Type",
      "Last-Modified"
    ],
    "MaxAgeSeconds": 86400
  }
]
```

5. Click **Save**
6. **Wait 10-15 minutes** for CORS changes to propagate globally

### 2.2 Verify CORS Configuration
Test CORS with curl:
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

Expected response should include CORS headers.

## Step 3: Environment Variables Setup

### 3.1 Frontend Environment Variables
Create/update your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2 Configuration
VITE_R2_PUBLIC_URL=https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev
VITE_R2_BUCKET_NAME=andres-castro-images
```

### 3.2 Supabase Edge Functions Environment Variables
1. Go to your Supabase Dashboard
2. Navigate to **Edge Functions**
3. Go to **Settings** or **Environment Variables**
4. Add these variables:

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=andres-castro-images
```

**CRITICAL**: These R2 credentials should ONLY be in Supabase Edge Functions, never in your frontend code!

## Step 4: Deploy Supabase Edge Functions

### 4.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 4.2 Login to Supabase
```bash
supabase login
```

### 4.3 Link Your Project
```bash
supabase link --project-ref your-project-ref
```

### 4.4 Deploy Edge Functions
```bash
supabase functions deploy upload-to-r2
supabase functions deploy delete-from-r2
```

### 4.5 Set Environment Variables
```bash
supabase secrets set R2_ACCOUNT_ID=your_account_id
supabase secrets set R2_ACCESS_KEY_ID=your_access_key_id
supabase secrets set R2_SECRET_ACCESS_KEY=your_secret_access_key
supabase secrets set R2_BUCKET_NAME=andres-castro-images
```

## Step 5: Testing and Verification

### 5.1 Test Image Upload
1. Go to your admin dashboard
2. Try uploading an image
3. Check browser console for errors
4. Verify the image appears in your R2 bucket

### 5.2 Test Image Display
1. Upload an image successfully
2. Check if it displays in the project grid
3. Verify the URL format is correct
4. Test in different browsers

### 5.3 Debug Common Issues

#### Issue: "R2 configuration is incomplete"
**Solution**: 
- Verify all environment variables are set in Supabase Edge Functions
- Redeploy edge functions after setting variables
- Check variable names match exactly

#### Issue: CORS errors in browser
**Solution**:
- Wait 15 minutes after CORS configuration
- Clear browser cache
- Try incognito mode
- Verify your domain is in AllowedOrigins

#### Issue: Images not loading
**Solution**:
- Check if URLs are properly formatted
- Verify R2 bucket is public
- Test direct URL access in browser
- Check network tab for failed requests

#### Issue: Upload fails with 403 error
**Solution**:
- Verify R2 API credentials are correct
- Check bucket permissions
- Ensure edge functions have correct environment variables

## Step 6: Advanced Configuration

### 6.1 Custom Domain (Recommended)
1. In R2 bucket settings, click **Connect Domain**
2. Add subdomain: `images.yourdomain.com`
3. Update DNS records as instructed
4. Update `VITE_R2_PUBLIC_URL` to use custom domain
5. This eliminates CORS issues entirely

### 6.2 Image Optimization
The system automatically optimizes images with:
- WebP format conversion
- Automatic compression
- Responsive sizing
- Thumbnail generation

### 6.3 Monitoring and Maintenance
- Monitor R2 usage in Cloudflare Dashboard
- Set up billing alerts
- Regularly clean up orphaned files using the Storage Manager
- Monitor edge function logs in Supabase

## Step 7: Troubleshooting Commands

### Test R2 Connectivity
```bash
# Test if R2 bucket is accessible
curl -I https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/

# Test CORS
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

### Check Supabase Edge Functions
```bash
# View function logs
supabase functions logs upload-to-r2

# Test function locally
supabase functions serve upload-to-r2
```

### Verify Environment Variables
```bash
# List all secrets
supabase secrets list
```

## Step 8: Security Best Practices

1. **Never expose R2 credentials in frontend code**
2. **Use environment variables for all sensitive data**
3. **Regularly rotate API keys**
4. **Monitor usage and set billing alerts**
5. **Use HTTPS only**
6. **Implement proper file validation**
7. **Set up proper CORS policies**

## Step 9: Performance Optimization

1. **Use WebP format for better compression**
2. **Implement lazy loading for images**
3. **Use responsive images with different sizes**
4. **Enable browser caching**
5. **Use CDN (Cloudflare automatically provides this)**
6. **Optimize image sizes before upload**

## Step 10: Backup and Recovery

1. **Regular bucket backups**
2. **Database backup of image references**
3. **Monitor orphaned files**
4. **Implement cleanup procedures**
5. **Document recovery procedures**

## Common Error Messages and Solutions

### "Image not available"
- Check CORS configuration
- Verify R2 bucket is public
- Test direct URL access
- Check network connectivity

### "R2 Storage configuration error"
- Verify environment variables in Supabase
- Redeploy edge functions
- Check API credentials

### "Upload failed"
- Check file size limits
- Verify file type restrictions
- Test edge function connectivity
- Check Supabase logs

### "Network error"
- Check internet connectivity
- Verify Supabase URL
- Test edge function endpoints
- Check firewall settings

## Support and Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [CORS Troubleshooting](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Final Checklist

- [ ] R2 bucket created and configured
- [ ] CORS policy applied and propagated
- [ ] Environment variables set correctly
- [ ] Edge functions deployed
- [ ] Upload functionality tested
- [ ] Image display verified
- [ ] Error handling working
- [ ] Performance optimized
- [ ] Security measures in place
- [ ] Monitoring set up

If you follow this guide step by step, your R2 image storage should work perfectly. If you encounter issues, refer to the specific troubleshooting sections above.