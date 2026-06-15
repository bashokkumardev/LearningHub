# Learning Hub

A modern learning platform to sell tech courses, offer resume services (PDF/Word), list latest jobs, and accept payments via Razorpay.

## Features

- **Courses** — Java, SQL, MongoDB, Spring Boot, Microservices, AWS, Cloud & DevOps
- **Razorpay Payments** — Secure checkout for course enrollment and resume packages
- **Resume Services** — ATS-optimized resumes in PDF and Word formats
- **Latest Jobs** — Searchable job listings with filters

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Razorpay

Copy `.env.example` to `.env.local` and add your Razorpay test/live keys from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys):

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

The site auto-deploys to GitHub Pages on every push to `main`.

**Live URL:** [https://bashokkumardev.github.io/LearningHub/](https://bashokkumardev.github.io/LearningHub/)

> GitHub Pages serves static files only. Razorpay payments work when you run locally (`npm run dev`) or deploy to a Node host like Vercel. On GitHub Pages, checkout buttons show a preview message.

### Enable Pages (first time)

In your repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**

## Razorpay Test Mode

Use Razorpay test cards for development:
- Card: `4111 1111 1111 1111`
- Expiry: any future date
- CVV: any 3 digits

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Razorpay Node SDK

## Project Structure

```
src/
├── app/
│   ├── api/razorpay/     # Payment API routes
│   ├── courses/          # Course catalog & detail pages
│   ├── resume-services/  # Resume packages & checkout
│   └── jobs/             # Job listings
├── components/           # Reusable UI components
└── lib/                  # Data & types
```
