# Fixed R2 CORS Configuration

## Correct CORS Policy for R2 Bucket

Use this exact CORS policy in your Cloudflare R2 bucket settings:

```json
[
  {
    "AllowedOrigins": [
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
    "MaxAgeSeconds": 3600
  }
]
```

## What Changed
- **Removed** `ExposedHeaders` (not needed for basic functionality)
- **Added** `OPTIONS` method (required for CORS preflight)
- **Simplified** structure (removed unnecessary complexity)

## How to Apply
1. Go to Cloudflare Dashboard
2. Navigate to R2 Object Storage
3. Select your bucket: `andres-castro-images`
4. Go to Settings tab
5. Find CORS Policy section
6. Replace existing policy with the one above
7. Save changes
8. Wait 5-10 minutes for propagation

## Test CORS
After applying, test with:
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://pub-69ff11d6ad5b4c02b2fb48ab7c50735d.r2.dev/
```

You should see CORS headers in the response.

## Alternative Minimal CORS (if above doesn't work)
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
    "AllowedHeaders": ["*"]
  }
]
```

This removes all optional fields and keeps only the essentials.