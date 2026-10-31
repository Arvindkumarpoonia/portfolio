# Arvind Poonia - Portfolio Website

> **Lead Android Engineer & Principal Consultant**  
> 10+ years of experience specializing in Kotlin, KMP, Jetpack Compose, MVVM, Clean Architecture, High-Frequency Telemetry, BLE/IoT, and Real-Time Systems.

---

## 🚀 Live Demo & GitHub Pages Deployment Guide

This portfolio is built with pure, modern **HTML5, Vanilla CSS, and ES6 JavaScript**. It requires **zero build step**, meaning it works natively and instantly on **GitHub Pages**.

### Remote GitHub Repository

- **Repository**: [https://github.com/Arvindkumarpoonia/portfolio.git](https://github.com/Arvindkumarpoonia/portfolio.git)
- **Live URL**: [https://arvindkumarpoonia.github.io/portfolio/](https://arvindkumarpoonia.github.io/portfolio/)

---

### Step 1: Enable GitHub Pages

1. Go to your repository on [GitHub](https://github.com/Arvindkumarpoonia/portfolio).
2. Click on **Settings** (gear icon) at the top right of your repo.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch** (or select **GitHub Actions** to use `.github/workflows/deploy.yml`).
   - **Branch**: Choose `main` and folder `/ (root)`.
5. Click **Save**!

Within 60 seconds, your portfolio will be live at:
👉 **`https://arvindkumarpoonia.github.io/portfolio/`**

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
