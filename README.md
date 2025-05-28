# 🎉 Birthday Greeting Website

A beautiful, interactive birthday website with animations, language quiz, and special video surprise!

## ✨ Features

- **Stunning Animations**: GSAP-powered animations with smooth transitions
- **Interactive Language Quiz**: Test knowledge of Ukrainian, German, and English
- **Animated Gift Box**: Click to reveal a special video surprise
- **Multilingual Messages**: Birthday wishes in multiple languages
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Glass morphism effects and gradient backgrounds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project:**

   ```bash
   cd birthday-greeting-site
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🎬 Adding Your Video

The website is set up to use `src/assets/surprise.mp4`. To add your own video:

1. Replace the existing `surprise.mp4` file with your video
2. Keep the same filename, or update the import in:
   - `src/components/VideoSection.tsx`
   - `src/components/GiftSection.tsx`

## 🌐 Deployment to GitHub Pages

### Option 1: Automatic Deployment

1. **Update package.json** (if needed):

   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name"
   }
   ```

2. **Install gh-pages:**

   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to package.json:**

   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 2: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`:**

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: "18"
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

## 🎨 Customization

### Colors and Themes

Edit `src/App.css` to change:

- Background gradients
- Glass effect colors
- Animation colors

### Quiz Questions

Modify the questions array in `src/components/QuizSection.tsx`:

```typescript
const questions: Question[] = [
  {
    id: 1,
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0, // Index of correct answer
    explanation: "Explanation text",
    flag: "🇺🇦", // Country flag emoji
  },
  // Add more questions...
];
```

### Messages and Text

Update text in:

- `src/components/IntroSection.tsx` - Welcome message
- `src/components/FinalSection.tsx` - Final birthday message
- `src/components/VideoSection.tsx` - Video description

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **GSAP** - Animations
- **Tailwind CSS** - Styling
- **Vite** - Build Tool

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎯 Performance Tips

1. **Video Optimization:**

   - Keep video file under 100MB
   - Use H.264 codec for best compatibility
   - Consider compressing for web

2. **Loading Speed:**
   - Images are optimized automatically
   - Animations are GPU-accelerated
   - Code is automatically minified

## 🐛 Troubleshooting

### Video Not Playing

- Check file format (MP4 recommended)
- Ensure file path is correct
- Try different browsers

### Animations Not Working

- Clear browser cache
- Check console for JavaScript errors
- Ensure GSAP is loaded properly

### Deployment Issues

- Check GitHub Pages settings
- Verify build process completes
- Check for any console errors

## 💝 Making It Personal

1. **Replace placeholder text** with your personal messages
2. **Add your own photos** in the assets folder
3. **Customize colors** to match preferences
4. **Update quiz questions** with personal/inside jokes
5. **Record a personal video** message

## 📄 License

This project is created with love for a special birthday celebration! 💖

---

**Made with 💖 for an amazing birthday celebration!**

_Happy Birthday! 🎂🎉_
