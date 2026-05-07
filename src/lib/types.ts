export type Language = "kannada" | "hindi" | "english";

export type SkillCategory =
  | "construction"
  | "electrical"
  | "plumbing"
  | "welding"
  | "carpentry"
  | "tailoring"
  | "agriculture"
  | "it_hardware"
  | "automotive"
  | "healthcare_aide";

export type WorkforceStatus =
  | "job_ready"
  | "requires_training"
  | "manual_verification"
  | "low_confidence"
  | "fraud_risk";

export type FraudRisk = "low" | "medium" | "high";

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  district: string;
  skillCategory: SkillCategory;
  preferredLanguage: Language;
  registeredAt: string;
  interviewCompleted: boolean;
  scores?: AIScores;
  status?: WorkforceStatus;
  fraudRisk?: FraudRisk;
  transcript?: string;
}

export interface AIScores {
  communication: number;
  confidence: number;
  relevance: number;
  authenticity: number;
  overall: number;
  fraudScore: number;
  languageDetected: Language;
  emotions: EmotionScores;
  fraudFlags: FraudFlag[];
}

export interface EmotionScores {
  confident: number;
  nervous: number;
  calm: number;
  engaged: number;
}

export interface FraudFlag {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface DashboardStats {
  totalCandidates: number;
  jobReady: number;
  fraudFlags: number;
  pendingReviews: number;
  weeklyTrend: WeeklyData[];
  districtData: DistrictData[];
  languageData: LanguageData[];
  classificationData: ClassificationData[];
}

export interface WeeklyData {
  day: string;
  interviews: number;
  completed: number;
}

export interface DistrictData {
  district: string;
  count: number;
}

export interface LanguageData {
  language: string;
  count: number;
  color: string;
}

export interface ClassificationData {
  status: string;
  count: number;
  color: string;
}
