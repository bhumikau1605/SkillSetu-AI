"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { RegistrationStep } from "@/components/interview/RegistrationStep";
import { InterviewScreen } from "@/components/interview/InterviewScreen";
import { AnalysisScreen } from "@/components/interview/AnalysisScreen";
import { ClassificationScreen } from "@/components/interview/ClassificationScreen";
import { Candidate, Language } from "@/lib/types";
import { generateAIScores, classifyCandidate } from "@/lib/mockData";

type Step = "register" | "interview" | "analysis" | "classification";

const STEPS: Step[] = ["register", "interview", "analysis", "classification"];
const STEP_LABELS = ["Register", "Interview", "Analysis", "Result"];

export default function InterviewPage() {
  const [step, setStep] = useState<Step>("register");
  const [candidate, setCandidate] = useState<Partial<Candidate>>({});
  const [transcript, setTranscript] = useState("");

  const scores = candidate.scores;
  const status = scores ? classifyCandidate(scores) : undefined;
  const stepIndex = STEPS.indexOf(step);

  const handleRegister = (data: Partial<Candidate>) => {
    setCandidate({
      ...data,
      id: `CAND-${Date.now().toString().slice(-4)}`,
    });
    setStep("interview");
  };

  const handleInterviewComplete = (t: string) => {
    setTranscript(t);
    const scores = generateAIScores();
    setCandidate((prev) => ({ ...prev, scores, transcript: t }));
    setStep("analysis");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">SkillSetu AI</span>
          </Link>

          {/* Step indicator */}
          <div className="hidden sm:flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    i === stepIndex
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : i < stepIndex
                      ? "text-emerald-400"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1} {STEP_LABELS[i]}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 h-px ${i < stepIndex ? "bg-emerald-500/50" : "bg-[var(--border)]"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {step !== "register" && step !== "classification" && (
              <button
                onClick={() => setStep(STEPS[stepIndex - 1])}
                className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {step === "register" && (
            <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RegistrationStep onNext={handleRegister} />
            </motion.div>
          )}

          {step === "interview" && (
            <motion.div key="interview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InterviewScreen
                language={(candidate.preferredLanguage as Language) || "english"}
                candidateName={candidate.name || "Candidate"}
                onComplete={handleInterviewComplete}
              />
            </motion.div>
          )}

          {step === "analysis" && scores && (
            <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnalysisScreen
                scores={scores}
                transcript={transcript}
                onNext={() => setStep("classification")}
              />
            </motion.div>
          )}

          {step === "classification" && scores && status && (
            <motion.div key="classification" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ClassificationScreen
                status={status}
                scores={scores}
                candidateName={candidate.name || "Candidate"}
                candidateId={candidate.id || "CAND-0000"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
