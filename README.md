# Arvind Kumar Poonia - Portfolio Website

> **Senior Android Developer & Team Lead**  
> 7+ years of experience specializing in Java, Kotlin, MVVM, ExoPlayer, Room DB, and Material Design.

---

## 🚀 Live Demo & GitHub Pages Deployment Guide

This portfolio is built with pure, modern **HTML5, Vanilla CSS, and ES6 JavaScript**. It requires **zero build step**, meaning it works natively and instantly on **GitHub Pages**.

### Step 1: Initialize Git & Push to GitHub

Open your terminal in this repository folder (`/Users/arvindkumar/Documents/Protfolio`) and run:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage and commit all files
git add .
git commit -m "feat: Initial commit for Arvind Kumar Poonia portfolio"

# 3. Rename branch to main
git branch -M main

# 4. Link your remote GitHub repository
# (Replace with your actual GitHub repository URL, e.g. https://github.com/<your-username>/portfolio.git)
git remote add origin https://github.com/<your-username>/portfolio.git

# 5. Push to GitHub
git push -u origin main
```

---

### Step 2: Enable GitHub Pages (Takes 30 Seconds!)

1. Go to your repository on [GitHub](https://github.com).
2. Click on **Settings** (gear icon) at the top right of your repo.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch** (or select **GitHub Actions** to use `.github/workflows/deploy.yml`).
   - **Branch**: Choose `main` and folder `/ (root)`.
5. Click **Save**!

Within 60 seconds, your portfolio will be live at:
👉 `https://<your-username>.github.io/<repository-name>/`

*(Or if you named the repo `<your-username>.github.io`, it will be live directly at `https://<your-username>.github.io/`!)*

---

## 💻 Local Development / Preview

To test or view your portfolio locally:

```bash
# Option A: Using python (built-in on macOS)
python3 -m http.server 3000

# Option B: Using npx serve
npx serve -l 3000 .
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features Included

- **Featured Projects**:
  - **FlowPlayer**: Multimedia player app with ExoPlayer and Firebase
  - **Meet & Greet**: QR-based contact sharing app with CameraX and Room DB
  - **Pixafame**: Live streaming application with real-time chat and floating reactions
- **Interactive Case Study Modal**: Deep dive into architecture, challenges, and solutions for each app
- **Light & Dark Mode**: Seamless toggle with local storage persistence
- **Sound FX Feedback**: Web Audio API synthesized clicks & success chimes (with mute switch)
- **Fluid Micro-Animations**: 3D perspective card tilt, canvas particles net, magnetic cursor, and scroll reveals
- **SEO & OpenGraph Optimized**: Complete meta tags ready for LinkedIn, Twitter, and search engines.
