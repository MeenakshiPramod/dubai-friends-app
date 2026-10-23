# Dubai Friends App (YC Pitch Prototype — V2.0 AI)

> **AI-Powered Relationship Intelligence & Hyper-Local Community for Dubai Expats, Students & Job Seekers.**  
> Inspired by Happenstance.ai, built for the vibrant Dubai ecosystem 🇦🇪.

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 The Problem
Over 85% of Dubai's population are expatriates. When students, software developers, and professionals land in Dubai:
1. They face **extreme cold outreach friction** (cold messages on LinkedIn or WhatsApp get ignored).
2. Fragmented cultural and campus communities (e.g. Malayalis, Indian/Arab universities) don't have a single unified discovery graph.
3. Job fairs and meetups happen in silos, and individuals often hesitate to attend large expos alone.

## 🚀 The Solution
**Dubai Friends** combines:
- **Happenstance-style Natural Language People Search:** Ask conversational queries (e.g. *"Find Malayali AI students in Marina attending GITEX"*).
- **Warm Introduction Paths:** Surfaces mutual trust bridges and shared events rather than cold DMs.
- **1-Click AI Warm Intro Drafter:** Generates culturally empathetic, high-converting icebreakers tailored for Dubai etiquette.
- **Interactive Events & Jobs Map:** Join group attendances for GITEX Career Fair, in5 Tech Hack-Nights, and browse verified LinkedIn job openings.

---

## 💻 Tech Stack
- **Web App:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons
- **Mobile Native Shell:** React Native (Expo)
- **Shared Package:** TypeScript monorepo (`@dubai-friends/shared`)
- **Database Architecture:** Supabase (PostgreSQL 15 + PostGIS geospatial extensions)

---

## 🏃 Quick Start (Local Demo)

```bash
# 1. Install dependencies
pnpm install

# 2. Start the Next.js Web App
pnpm dev:web

# App will be live at http://localhost:3000
```

---

## 📸 Key Features for YC Live Pitch
1. **Natural Language Query Bar:** Test instant queries on `/discover` using the suggested prompt chips.
2. **Warm Intro Modal:** Click `"Draft AI Warm Intro"` on any user card to see the visual relationship path and test tone variations (Cultural Warmth, Job Referral, Event Buddy).
3. **Interactive Map:** Toggle Dubai neighborhood pins and group attendances on `/events`.
4. **Verified LinkedIn Jobs:** Explore `/jobs` with direct application URLs.

Developed by [Meenakshi Pramod](https://github.com/MeenakshiPramod).
