# Minimal R2 CORS Configuration

## Ultra-Simple CORS Policy

Use this minimal CORS policy in your Cloudflare R2 bucket:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"]
  }
]
```

## What This Does
- **AllowedOrigins**: `["*"]` - Allows all domains
- **AllowedMethods**: Basic HTTP methods (removed OPTIONS)
- **AllowedHeaders**: `["*"]` - Allows all headers
- **No optional fields** - Removes MaxAgeSeconds and ExposedHeaders

## Steps to Apply
1. Go to Cloudflare Dashboard → R2 Object Storage
2. Select bucket: `andres-castro-images`
3. Go to Settings tab
4. Find CORS Policy section
5. Paste the JSON above
6. Save
7. Wait 5 minutes

## If Still Having Issues
Try this even more basic version:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }
]
```

This removes DELETE and HEAD methods entirely.

## Test After Setup
```bash
curl -I https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

Should return headers without CORS errors.