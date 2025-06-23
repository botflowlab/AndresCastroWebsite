# 📁 How to Push Public Folder to GitHub

Since Git is not available in the WebContainer environment, you'll need to do this manually on your local machine.

## Option 1: Quick Manual Steps

1. **Download/Clone your project** to your local machine
2. **Open terminal** in your project directory
3. **Run these commands:**

```bash
# Add all files including public folder
git add .

# Commit with a descriptive message
git commit -m "Deploy: Add public folder with all assets"

# Push to GitHub
git push origin main
```

## Option 2: Using the NPM Scripts (Recommended)

Once you have the project locally, you can use the scripts I created:

```bash
# Just commit and push current changes
npm run deploy:git

# Build first, then commit and push
npm run deploy:build-and-git
```

## What's Already Been Done ✅

1. **Updated `.gitignore`** - Public folder is now tracked
2. **Created deployment script** - `scripts/deploy-to-git.js`
3. **Added npm scripts** - Ready to use once you're local
4. **Built the project** - All files are ready in `/dist`

## Files That Will Be Pushed 📦

- ✅ All `/public` folder contents (images, assets, etc.)
- ✅ Built files in `/dist` folder
- ✅ Source code and configuration
- ✅ Translation files
- ✅ All project assets

## Verification Steps

After pushing, verify on GitHub that you can see:
- `/public/images/` folder with all images
- `/dist/` folder with built files
- All other project files

## For Netlify Deployment

Once pushed to GitHub, your Netlify deployment will have access to:
- All static assets from `/public`
- Built application from `/dist`
- Proper routing with `_redirects` file

## Troubleshooting

If you encounter issues:

1. **"not a git repository"**:
   ```bash
   git init
   git remote add origin <your-github-repo-url>
   git branch -M main
   ```

2. **"no upstream branch"**:
   ```bash
   git push -u origin main
   ```

3. **Large files warning**:
   - This is normal for image assets
   - GitHub supports files up to 100MB

## Next Steps

1. Download/clone project locally
2. Run `npm run deploy:git`
3. Check GitHub repository
4. Verify Netlify deployment updates