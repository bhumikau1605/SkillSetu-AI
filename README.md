# SkillSetu AI — AI Workforce Intelligence Platform

---

## 👥 Team TwinLogic

| | |
|---|---|
| **Prototype** | SkillSetu AI |
| **Theme** | Theme 5 |
| **Members** | Brinda U · Bhumika U |

---

> **Karnataka Government Initiative · Hackathon Prototype**
>
> ಕರ್ನಾಟಕದ ಕಾರ್ಮಿಕರಿಗಾಗಿ AI ಮೌಲ್ಯಮಾಪನ ವ್ಯವಸ್ಥೆ

An end-to-end AI-powered platform that automates workforce assessment for Karnataka's skilled workers — supporting Kannada, Hindi, and English.

---

## Features

- **AI Video Interviews** — Automated interviews with real-time transcription and emotion analysis
- **Smart Scoring Engine** — Multi-dimensional scoring: communication, confidence, relevance, and authenticity
- **Fraud Detection** — Detects duplicate candidates, multiple faces, and audio inconsistencies automatically
- **Multilingual Support** — Kannada-first experience with full Hindi and English support
- **Analytics Dashboard** — District-wise insights, classification trends, and workforce readiness reports
- **Workforce Classification** — Auto-classifies candidates: Job Ready, Needs Training, or Manual Review

---

## How It Works

```
Register → AI Interview → AI Analysis → Classification
```

1. **Register** — Candidate fills basic details and selects preferred language
2. **AI Interview** — Answers 5 questions via webcam in Kannada, Hindi, or English
3. **AI Analysis** — Scores communication, confidence, relevance, and authenticity
4. **Classification** — Auto-classified into workforce readiness categories with a full report

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Charts | Recharts |
| UI Primitives | Radix UI, Lucide React |
| State | Zustand |
| AI / ML | Speech-to-Text (multilingual), Emotion Analysis, Fraud Detection CV, NLP Scoring |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── interview/page.tsx    # 4-step interview flow
│   └── admin/
│       ├── page.tsx          # Dashboard overview
│       ├── candidates/       # Candidate table
│       ├── fraud/            # Fraud review panel
│       ├── reports/          # Export reports
│       └── settings/
├── components/
│   ├── landing/              # Hero, Features, CTA, Navbar
│   ├── interview/            # Registration, Interview, Analysis, Classification screens
│   ├── dashboard/            # StatsCards, Charts, CandidateTable, SidebarNav
│   └── ui/                   # Button, Card, Badge, ScoreBar, ThemeToggle
└── lib/
    ├── types.ts              # TypeScript interfaces
    ├── mockData.ts           # Mock candidate & score generation
    ├── store.ts              # Zustand global store
    └── utils.ts
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Route | Description |
|---|---|
| `/` | Landing page |
| `/interview` | Start a candidate interview |
| `/admin` | Admin dashboard |
| `/admin/candidates` | Full candidate list |
| `/admin/fraud` | Fraud review panel |
| `/admin/reports` | Export reports |

---

## Workforce Classification

| Status | Criteria |
|---|---|
| ✅ Job Ready | Overall ≥ 80 and Authenticity ≥ 75 |
| 🟡 Needs Training | Overall ≥ 65 |
| 🔵 Manual Review | Overall ≥ 50 |
| ⚪ Low Confidence | Overall < 50 |
| 🔴 Fraud Risk | Fraud score > 65 |

---

## Fraud Detection Flags

| Flag | Severity |
|---|---|
| Multiple Faces | High |
| Audio Mismatch | Medium |
| Low Visibility | Low |
| Duplicate Candidate | High |

---

## Supported Skill Categories

Construction · Electrical · Plumbing · Welding · Carpentry · Tailoring · Agriculture · IT Hardware · Automotive · Healthcare Aide

---

## Districts Covered

Bengaluru Urban · Mysuru · Belagavi · Hubballi-Dharwad · Mangaluru · Kalaburagi · Ballari · Shivamogga · Tumakuru · Vijayapura *(and 20 more)*

---

## Presentation

A full project presentation is available at [`SkillSetu_AI_Presentation.pptx`](./SkillSetu_AI_Presentation.pptx) (10 slides).

---

## License

TwinLogic Hackathon prototype — Karnataka Government Workforce Initiative © 2026
