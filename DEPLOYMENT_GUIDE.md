# Birthday Wish Website - Deployment Guide

## 🎉 Project Overview

This is a beautiful, interactive birthday website built with React, TypeScript, and Framer Motion. The website features:

- **Gift Box Invitation**: Interactive 3D gift box that opens to reveal the experience
- **Photo Gallery**: Beautiful timeline of memories with your actual photos
- **Video Surprise**: Flower that blooms to reveal a special video message
- **Interactive Cake**: Click to slice the cake with confetti celebration
- **Birthday Finale**: Dramatic finale with personalized message and music

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Confetti**: react-confetti
- **Deployment**: Vercel

## 📁 Project Structure

```
Birthday Wish Website Design/
├── public/
│   ├── images/          # Your photos (Photo1.svg, Photo2.svg, etc.)
│   ├── videos/          # Your video (birthday_video.mp4.mp4)
│   └── audio/           # Background music (background_song.mp3)
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS styles
│   └── App.tsx          # Main application
├── package.json
└── vite.config.ts
```

## 🎵 Asset Placement Guide

### Photos
- Place all your `.svg` images inside `/public/images/`
- Use the exact filenames: `Photo1.svg`, `Photo2.svg`, `Photo3.svg`, `Photo4.svg`
- The component will automatically load these images

### Video
- Place your special `.mp4` video file inside `/public/videos/`
- The current filename is `birthday_video.mp4.mp4`
- The video will autoplay when the flower blooms

### Audio
- Place your background song (`.mp3`) inside `/public/audio/`
- The current filename is `background_song.mp3`
- This plays as background music throughout the experience

## 🚀 Deployment to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Birthday website"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it something like `birthday-wish-website`
   - Make it public or private (your choice)
   - Don't initialize with README (since you already have files)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/birthday-wish-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

3. **Build Settings** (should be auto-detected):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your website will be live at a URL like `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 🎨 Customization

### Changing the Name
Edit `src/components/BirthdayFinale.tsx`:
```typescript
const birthdayText = "Happy Birthday, YOUR_NAME!";
```

### Updating the Personal Message
Edit `src/components/BirthdayFinale.tsx`:
```typescript
const personalMessage = "Your personalized message here...";
```

### Changing Colors
Edit `src/styles/globals.css` to modify the color variables:
```css
:root {
  --creamy-white: #FFF8F0;
  --dusty-rose: #E7BDB6;
  --soft-gold: #D4AF37;
  --charcoal-grey: #36454F;
  --muted-taupe: #8A7F80;
}
```

## 🔧 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📱 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions between sections
- **Audio Integration**: Background music and birthday song
- **Interactive Elements**: Clickable gift box, flower, and cake
- **Confetti Celebration**: Realistic confetti when cake is cut
- **Video Support**: Full-screen video modal
- **Photo Gallery**: Masonry-style photo layout

## 🎯 User Experience Flow

1. **Invitation**: User sees gift box with "For my dearest, Behli"
2. **Gallery**: Photos appear with beautiful animations
3. **Video**: Flower blooms to reveal special video
4. **Cake**: Interactive cake cutting with confetti
5. **Finale**: Birthday message with music and sparkles

## 🐛 Troubleshooting

### Common Issues:

1. **Audio not playing**: Modern browsers require user interaction before playing audio
2. **Video not loading**: Check file path and format (MP4 recommended)
3. **Images not showing**: Ensure SVG files are in `/public/images/`
4. **Build errors**: Run `npm install` to ensure all dependencies are installed

### Performance Tips:

- Optimize images before adding to `/public/images/`
- Keep video file size reasonable (< 50MB recommended)
- Use compressed audio files for faster loading

## 🎉 Success!

Your birthday website is now ready to deploy! The recipient will have a magical, interactive experience that they'll never forget.

---

**Happy Birthday! 🎂✨**
