![magodavidmaestro.com](screenshots/laptop_above_fold.png)

<p align="center"><em>Official website for David Maestro — Professional magician and illusionist.</em></p>

<p align="center">
  <a href="https://magodavidmaestro.com"><img src="https://img.shields.io/badge/live-magodavidmaestro.com-crimson?style=for-the-badge" alt="Live Site"></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-4.16-FF5D01?style=for-the-badge&logo=astro" alt="Astro"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-proprietary-gray?style=for-the-badge" alt="License"></a>
</p>

---

## Overview

A modern, high-performance website showcasing David Maestro's magic performances, featuring bilingual support (EN/ES), comprehensive SEO optimization, and seamless user experience across all devices.

### Key Features

- 🌍 **Bilingual** — Full English and Spanish localization
- ⚡ **Lightning Fast** — Static site generation with Astro
- 📱 **Responsive** — Optimized for mobile, tablet, and desktop
- 🎨 **Custom Design System** — Dark theme with crimson accents
- 🔍 **SEO Optimized** — Schema.org structured data, IndexNow protocol
- ♿ **Accessible** — ARIA compliant, semantic HTML
- 📊 **Analytics** — Google Tag Manager with Consent Mode v2
- 🖼️ **Modern Images** — WebP format with fallbacks

---

## Tech Stack

### Core

- **[Astro 4.16](https://astro.build)** — Static site generator
- **[TypeScript 5.6](https://www.typescriptlang.org/)** — Type safety
- **CSS Custom Properties** — Design tokens system
- **[Fontsource Variable](https://fontsource.org/)** — Bodoni Moda + Manrope

### SEO & Analytics

- **Google Tag Manager** — Analytics and tracking
- **Consent Mode v2** — GDPR-compliant cookie consent
- **IndexNow** — Instant Bing/Yandex indexing
- **Schema.org** — Structured data (Service, Review, Video)
- **Sitemap** — Bilingual with hreflang annotations

### Infrastructure

- **GitHub Actions** — Automated deployment
- **GitHub Pages** — Static hosting
- **Cloudflare** — CDN, caching, email routing
- **FormSubmit** — Contact form backend

---

## Performance

### Core Web Vitals

| Metric | Score | Target |
|--------|-------|--------|
| **LCP** | < 1.5s | ✅ Good |
| **FID** | < 50ms | ✅ Good |
| **CLS** | < 0.05 | ✅ Good |

### Optimizations

- ✅ Hero image preload with `fetchpriority="high"`
- ✅ Font display swap to prevent FOIT
- ✅ WebP images (37% smaller than JPG)
- ✅ Minimal JavaScript (progressive enhancement)
- ✅ Cloudflare caching (365-day max-age on static assets)

---

## Project Structure

```
magodavidmaestro.com/
├── src/
│   ├── components/       # Astro components
│   │   ├── Hero.astro
│   │   ├── Nav.astro
│   │   ├── Contact.astro
│   │   ├── ReviewSchema.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Base.astro    # Base layout with meta tags
│   ├── pages/
│   │   ├── index.astro   # EN homepage
│   │   ├── legal.astro
│   │   └── es/           # Spanish routes
│   │       ├── index.astro
│   │       └── legal.astro
│   └── styles/
│       ├── tokens.css    # Design tokens
│       └── fonts.css     # Font overrides
├── public/
│   ├── img/              # Images (JPG + WebP)
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   ├── convert-images.mjs
│   └── build-favicons.mjs
└── astro.config.mjs
```

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/PumaZilla/MagoDavidMaestro.git
cd MagoDavidMaestro

# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run check        # TypeScript type checking
```

### Optional Asset Pipelines

Rerun when source SVG or raw photos change:

```bash
npm run assets:favicons   # Regenerate favicon PNG variants from favicon.svg
npm run assets:photos     # Optimize raw photos into web-ready JPG + WebP
npm run assets:textures   # Optimize textures into WebP + JPG
```

---

## Deployment

The site deploys automatically via GitHub Actions on push to `main`:

1. **Build** — Astro generates static HTML/CSS/JS
2. **Deploy** — Files pushed to `gh-pages` branch
3. **IndexNow** — URLs submitted to Bing/Yandex
4. **Live** — Changes visible at magodavidmaestro.com

---

## SEO Features

### Structured Data

- **EntertainmentBusiness** — Organization markup
- **Service** — Stage magic, close-up, corporate shows
- **Review** — 5 testimonials with AggregateRating
- **VideoObject** — 4 YouTube embeds with metadata

### Indexing

- **Sitemap** — `sitemap-index.xml` with EN/ES hreflang
- **IndexNow** — Auto-submission on build (Bing, Yandex)
- **Robots.txt** — AI crawler permissions (GPTBot, Claude, Perplexity)

### Performance

- **Image Optimization** — WebP with `<picture>` fallback
- **Font Loading** — `font-display: swap`
- **Resource Hints** — Preconnect to GTM, YouTube
- **Cache Headers** — 365-day via Cloudflare Transform Rules

---

## Internationalization

The site supports English and Spanish with complete content parity:

- **English** — `/` (default)
- **Spanish** — `/es/`

### Implementation

Each component uses a `t` object for translations:

```astro
const t = {
  es: { title: 'Contacto', ... },
  en: { title: 'Contact', ... },
}[lang];
```

Hreflang annotations in `<head>` for SEO:

```html
<link rel="alternate" hreflang="en" href="https://magodavidmaestro.com/" />
<link rel="alternate" hreflang="es" href="https://magodavidmaestro.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://magodavidmaestro.com/" />
```

---

## Contact Form

Posts to [FormSubmit](https://formsubmit.co) at `info@magodavidmaestro.com`.

First submission triggers a one-off confirmation email — open it once to activate delivery. No account, no dashboard, no backend required.

---

## Analytics

Google Analytics 4 (`G-TGK8K3CK84`) loaded via `gtag.js` with Consent Mode v2.

- All consent categories default to `denied`
- `analytics_storage` upgrades to `granted` only after visitor accepts cookie banner
- IP anonymization enabled

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before making any changes.

---

## License

Copyright © 2024-2026 David Maestro. All rights reserved.

This is proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

## Contact

For booking inquiries, visit [magodavidmaestro.com](https://magodavidmaestro.com)

---

<p align="center">Built with ♠️ by <a href="https://github.com/PumaZilla">Kike Fontán</a></p>
