import {
  Candidate,
  AIScores,
  DashboardStats,
  WorkforceStatus,
  FraudRisk,
  Language,
} from "./types";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const DISTRICTS = [
  "Bengaluru Urban",
  "Mysuru",
  "Belagavi",
  "Hubballi-Dharwad",
  "Mangaluru",
  "Kalaburagi",
  "Ballari",
  "Shivamogga",
  "Tumakuru",
  "Vijayapura",
];

export const SKILL_LABELS: Record<string, string> = {
  construction: "Construction",
  electrical: "Electrical",
  plumbing: "Plumbing",
  welding: "Welding",
  carpentry: "Carpentry",
  tailoring: "Tailoring",
  agriculture: "Agriculture",
  it_hardware: "IT Hardware",
  automotive: "Automotive",
  healthcare_aide: "Healthcare Aide",
};

export const LANGUAGE_LABELS: Record<string, string> = {
  kannada: "ಕನ್ನಡ",
  hindi: "हिंदी",
  english: "English",
};

export const STATUS_CONFIG: Record<
  WorkforceStatus,
  { label: string; color: string; bg: string }
> = {
  job_ready: {
    label: "Job Ready",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  requires_training: {
    label: "Needs Training",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  manual_verification: {
    label: "Manual Review",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  low_confidence: {
    label: "Low Confidence",
    color: "text-slate-400",
    bg: "bg-slate-500/10 border-slate-500/20",
  },
  fraud_risk: {
    label: "Fraud Risk",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
};

export const FRAUD_CONFIG: Record<
  FraudRisk,
  { label: string; color: string; bg: string }
> = {
  low: { label: "Low", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  medium: { label: "Medium", color: "text-amber-400", bg: "bg-amber-500/10" },
  high: { label: "High", color: "text-red-400", bg: "bg-red-500/10" },
};

export const INTERVIEW_QUESTIONS = {
  english: [
    "Tell us about your work experience and background.",
    "What specific skills do you have in your trade?",
    "Have you worked with machinery or specialized tools?",
    "Describe a challenging situation at work and how you handled it.",
    "Why should we consider you for this opportunity?",
  ],
  hindi: [
    "अपने काम के अनुभव के बारे में बताएं।",
    "आपके पास कौन से विशेष कौशल हैं?",
    "क्या आपने मशीनरी या विशेष उपकरणों के साथ काम किया है?",
    "काम पर एक चुनौतीपूर्ण स्थिति का वर्णन करें।",
    "हमें आपको क्यों चुनना चाहिए?",
  ],
  kannada: [
    "ನಿಮ್ಮ ಕೆಲಸದ ಅನುಭವದ ಬಗ್ಗೆ ಹೇಳಿ.",
    "ನಿಮ್ಮ ವಿಶೇಷ ಕೌಶಲ್ಯಗಳು ಯಾವುವು?",
    "ನೀವು ಯಂತ್ರಗಳು ಅಥವಾ ವಿಶೇಷ ಉಪಕರಣಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ್ದೀರಾ?",
    "ಕೆಲಸದಲ್ಲಿ ಒಂದು ಸವಾಲಿನ ಸಂದರ್ಭವನ್ನು ವಿವರಿಸಿ.",
    "ನಾವು ನಿಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
  ],
};

export const SAMPLE_TRANSCRIPTS = [
  "I have been working in construction for over 8 years. I started as a helper and gradually learned masonry, plastering, and basic electrical work. I have worked on residential buildings and small commercial projects in Bengaluru.",
  "My main skill is electrical wiring. I completed my ITI diploma in electrical trade from Mysuru. I have experience in domestic wiring, panel installation, and basic industrial work.",
  "I am a trained welder with 5 years of experience. I can do MIG, TIG, and arc welding. I have worked in a fabrication workshop and also done on-site structural welding.",
];

const DETECTED_LANGUAGES: Language[] = ["kannada", "hindi", "english"];

export function generateAIScores(seed?: number): AIScores {
  const base = seed ? (seed % 30) + 55 : rand(50, 95);
  const fraudScore = rand(5, 35);

  const flags = [];
  if (fraudScore > 60)
    flags.push({
      type: "Multiple Faces",
      severity: "high" as const,
      description: "Multiple people detected in frame",
    });
  if (fraudScore > 45)
    flags.push({
      type: "Audio Mismatch",
      severity: "medium" as const,
      description: "Voice pattern inconsistency detected",
    });
  if (fraudScore > 30)
    flags.push({
      type: "Low Visibility",
      severity: "low" as const,
      description: "Face partially obscured during interview",
    });

  return {
    communication: Math.min(100, base + rand(-10, 10)),
    confidence: Math.min(100, base + rand(-15, 15)),
    relevance: Math.min(100, base + rand(-8, 12)),
    authenticity: Math.min(100, 100 - fraudScore + rand(-5, 5)),
    overall: base,
    fraudScore,
    languageDetected: DETECTED_LANGUAGES[rand(0, 2)],
    emotions: {
      confident: rand(40, 85),
      nervous: rand(10, 45),
      calm: rand(30, 75),
      engaged: rand(50, 90),
    },
    fraudFlags: flags,
  };
}

export function classifyCandidate(scores: AIScores): WorkforceStatus {
  if (scores.fraudScore > 65) return "fraud_risk";
  if (scores.overall >= 80 && scores.authenticity >= 75) return "job_ready";
  if (scores.overall >= 65) return "requires_training";
  if (scores.overall >= 50) return "manual_verification";
  return "low_confidence";
}

export function getFraudRisk(fraudScore: number): FraudRisk {
  if (fraudScore > 65) return "high";
  if (fraudScore > 35) return "medium";
  return "low";
}

const NAMES = [
  "Ravi Kumar",
  "Priya Nair",
  "Suresh Gowda",
  "Lakshmi Devi",
  "Mohammed Irfan",
  "Anitha Reddy",
  "Basavaraj Patil",
  "Kavitha Shetty",
  "Nagaraj Murthy",
  "Deepa Kumari",
  "Venkatesh Rao",
  "Shobha Hegde",
  "Manjunath BK",
  "Rekha Naik",
  "Santhosh Kumar",
  "Usha Rani",
  "Prakash Jain",
  "Meena Kumari",
  "Rajesh Nayak",
  "Savitha Gowda",
];

const SKILLS = [
  "construction",
  "electrical",
  "plumbing",
  "welding",
  "carpentry",
  "tailoring",
  "agriculture",
  "it_hardware",
  "automotive",
  "healthcare_aide",
] as const;

const LANGUAGES: Language[] = ["kannada", "hindi", "english"];

export function generateMockCandidates(count = 20): Candidate[] {
  return Array.from({ length: count }, (_, i) => {
    const scores = generateAIScores(i * 7 + 13);
    const status = classifyCandidate(scores);
    return {
      id: `CAND-${String(i + 1).padStart(4, "0")}`,
      name: NAMES[i % NAMES.length],
      phone: `+91 ${rand(70000, 99999)}${rand(10000, 99999)}`,
      district: DISTRICTS[i % DISTRICTS.length],
      skillCategory: SKILLS[i % SKILLS.length],
      preferredLanguage: LANGUAGES[i % LANGUAGES.length],
      registeredAt: new Date(
        Date.now() - rand(0, 30) * 86400000
      ).toISOString(),
      interviewCompleted: i < 16,
      scores: i < 16 ? scores : undefined,
      status: i < 16 ? status : undefined,
      fraudRisk: i < 16 ? getFraudRisk(scores.fraudScore) : undefined,
      transcript:
        i < 16 ? SAMPLE_TRANSCRIPTS[i % SAMPLE_TRANSCRIPTS.length] : undefined,
    };
  });
}

export function getDashboardStats(): DashboardStats {
  const candidates = generateMockCandidates(20);
  const completed = candidates.filter((c) => c.interviewCompleted);

  return {
    totalCandidates: candidates.length,
    jobReady: completed.filter((c) => c.status === "job_ready").length,
    fraudFlags: completed.filter((c) => c.fraudRisk === "high").length,
    pendingReviews: candidates.filter((c) => !c.interviewCompleted).length,
    weeklyTrend: [
      { day: "Mon", interviews: 12, completed: 10 },
      { day: "Tue", interviews: 18, completed: 15 },
      { day: "Wed", interviews: 24, completed: 20 },
      { day: "Thu", interviews: 16, completed: 14 },
      { day: "Fri", interviews: 28, completed: 25 },
      { day: "Sat", interviews: 20, completed: 18 },
      { day: "Sun", interviews: 8, completed: 7 },
    ],
    districtData: DISTRICTS.slice(0, 6).map((d, i) => ({
      district: d.split("-")[0].trim(),
      count: [45, 38, 32, 28, 24, 19][i],
    })),
    languageData: [
      { language: "ಕನ್ನಡ", count: 58, color: "#f59e0b" },
      { language: "हिंदी", count: 24, color: "#3b82f6" },
      { language: "English", count: 18, color: "#8b5cf6" },
    ],
    classificationData: [
      { status: "Job Ready", count: 6, color: "#10b981" },
      { status: "Needs Training", count: 5, color: "#f59e0b" },
      { status: "Manual Review", count: 3, color: "#3b82f6" },
      { status: "Low Confidence", count: 1, color: "#64748b" },
      { status: "Fraud Risk", count: 1, color: "#ef4444" },
    ],
  };
}
