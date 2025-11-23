
# **Zenith / OrganizeMe – Smart AI Productivity Platform**

## 🌟 Project Overview

**Zenith (OrganizeMe)** is a **full-stack SaaS web application** designed to help students, freelancers, and content creators manage their daily lives intelligently using AI.
The platform includes task management, habit tracking, budget planning, AI-powered template generation, a digital template marketplace, and a fully-featured dashboard.
 it has been **extensively customized and expanded** to include full-stack features, AI integration, and complete user control, making it an original and production-ready application.

---

## 🚀 Key Features Added by Me

* **Professional Dashboard:** Daily tasks, habit overview, weekly analytics, financial logs, AI suggestions.
* **Task Manager:** Kanban board, calendar view, reminders, export to PDF/Excel.
* **Habit Tracker:** Track daily/weekly habits, gamification rewards after 30 days of consistency.
* **Budget Planner:** Track income & expenses, charts, monthly comparison, generate PDF/Excel reports.
* **Digital Template Marketplace:** Preview templates, direct purchase, download links, add to favorites.
* **AI Template Builder:** Convert user descriptions into JSON + Google Sheets + ready-to-download Excel with formulas, colors, and layouts.
* **Internal Template Designer:** Design tables like Notion/Excel, add texts, colors, formulas, save & share templates.
* **Authentication & Security:** JWT Auth, Google OAuth, Email verification, Password reset, Rate limiting.
* **Analytics System:** Productivity index, spending patterns, habit completion %, AI recommendations.
* **Settings Page:** Theme change, profile picture upload, Google Drive sync, support for EN/AR languages.

---

## 🧱 Tech Stack

* **Frontend:** Next.js 15 + React + TypeScript + TailwindCSS + Framer Motion + Zustand + Recharts
* **Backend:** NestJS + REST API + JWT Auth + Google Drive & Sheets API + OpenAI API + Stripe/Paymob
* **Database:** MongoDB + Mongoose + Redis (optional)
* **Storage:** AWS S3

---

## 🎨 UI/UX Design

* Minimalist design with **rounded cards, soft shadows, clean spacing, and animated elements**.
* Color palette:

  * `#F7EFEA` Beige (background)
  * `#FFF7F3` Off-white (cards)
  * `#6C4A74` Purple (primary elements)
  * `#C79BCF` Soft Lavender (secondary buttons)
  * `#E9DCEC` Light Purple (section backgrounds)
* Fonts: Inter, Manrope, Cairo (for Arabic)

---

## 🛠 Installation & Running Locally

1. Clone the repository:

```bash
git clone https://github.com/muzansiddig/Zenith.git
cd Zenith
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Setup environment variables (`.env`):

```text
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
S3_BUCKET=your_s3_bucket
STRIPE_KEY=your_stripe_key  # or Paymob
```

4. Run the project:

```bash
# Backend
npm run start:dev

# Frontend
npm run dev
```

---

## 📦 Project Structure (Simplified)

```
/frontend
  /components
  /pages
  /stores
  /utils
/backend
  /modules
    /auth
    /tasks
    /habits
    /budget
    /templates
    /analytics
  /services
  /controllers
  /dtos
  /models
  /config
```

---

## 📄 License

This project is licensed under **MIT License*
