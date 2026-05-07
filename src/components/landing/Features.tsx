"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import {
  Video, Brain, Shield, BarChart3, Globe, Users,
  CheckCircle, Mic
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "AI Video Interviews",
    desc: "Automated video interviews with real-time transcription and emotion analysis.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Brain,
    title: "Smart Scoring Engine",
    desc: "Multi-dimensional scoring: communication, confidence, relevance, and authenticity.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    desc: "Detect duplicate candidates, multiple faces, audio inconsistencies automatically.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    desc: "Kannada-first experience with full support for Hindi and English interviews.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "District-wise insights, classification trends, and workforce readiness reports.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Workforce Classification",
    desc: "Auto-classify candidates: Job Ready, Needs Training, or Manual Review.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm mb-4">
            Platform Features
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Everything you need to assess{" "}
            <span className="gradient-text">Karnataka&apos;s workforce</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
            From registration to final classification &mdash; a complete AI-powered pipeline
            for government workforce assessment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card hover className="p-6 h-full">
                <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Workflow steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
          id="how-it-works"
        >
          <h3 className="text-2xl font-bold text-center text-[var(--foreground)] mb-12">
            How it works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Users, title: "Register", desc: "Candidate fills basic details and selects preferred language" },
              { step: "02", icon: Mic, title: "AI Interview", desc: "Answers questions via webcam in Kannada, Hindi, or English" },
              { step: "03", icon: Brain, title: "AI Analysis", desc: "Scores communication, confidence, relevance, and authenticity" },
              { step: "04", icon: CheckCircle, title: "Classification", desc: "Auto-classified into workforce readiness categories" },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent z-10" />
                )}
                <Card className="p-6 text-center">
                  <div className="text-4xl font-black text-blue-500/20 mb-3">{item.step}</div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-[var(--foreground)] mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
