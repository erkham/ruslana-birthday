# 🚀 Deployment Guide

## Quick Deployment to GitHub Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "🎉 Beautiful birthday website ready!"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The site will automatically deploy when you push to main branch

### Step 3: Access Your Site

Your site will be available at:

```
https://yourusername.github.io/ruslana-birthday/
```

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

## Customization Before Deployment

### 1. Update Repository Name

If your repository has a different name, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/your-repo-name/",
  // ... rest of config
});
```

### 2. Add Your Personal Messages

- Edit `src/components/FinalSection.tsx` for the final message
- Update `src/components/IntroSection.tsx` for the welcome text
- Modify quiz questions in `src/components/QuizSection.tsx`

### 3. Replace Video

- Replace `src/assets/surprise.mp4` with your video
- Keep the same filename for automatic integration

## Troubleshooting

### Site Not Loading

- Check GitHub Pages settings
- Verify the base path in `vite.config.ts` matches your repo name
- Wait a few minutes for deployment to complete

### Video Not Playing

- Ensure video is in MP4 format
- Check file size (keep under 100MB for GitHub)
- Test locally first with `npm run dev`

### Build Errors

- Run `npm run build` locally to check for errors
- Check console for any TypeScript errors
- Ensure all dependencies are installed

## Performance Tips

1. **Optimize Video**: Compress your video for web
2. **Test Mobile**: Check on different devices
3. **Browser Testing**: Test in Chrome, Firefox, Safari

---

**Ready to surprise someone special? 🎁💖**
