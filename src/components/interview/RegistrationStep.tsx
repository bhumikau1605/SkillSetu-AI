"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DISTRICTS, SKILL_LABELS } from "@/lib/mockData";
import { Candidate, Language, SkillCategory } from "@/lib/types";
import { User, Phone, MapPin, Briefcase } from "lucide-react";

interface Props {
  onNext: (data: Partial<Candidate>) => void;
}

export function RegistrationStep({ onNext }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    district: "",
    skillCategory: "" as SkillCategory,
    preferredLanguage: "kannada" as Language,
  });

  const valid = form.name && form.phone && form.district && form.skillCategory;

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Candidate Registration
        </h2>
        <p className="text-[var(--muted-foreground)] text-sm">
          ಅಭ್ಯರ್ಥಿ ನೋಂದಣಿ · उम्मीदवार पंजीकरण
        </p>
      </div>

      <Card className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
            Full Name / ಪೂರ್ಣ ಹೆಸರು
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
            Phone Number / ಫೋನ್ ಸಂಖ್ಯೆ
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
            District / ಜಿಲ್ಲೆ
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <select
              className={`${inputClass} pl-10 appearance-none`}
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            >
              <option value="">Select district</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
            Skill Category / ಕೌಶಲ್ಯ ವರ್ಗ
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <select
              className={`${inputClass} pl-10 appearance-none`}
              value={form.skillCategory}
              onChange={(e) => setForm({ ...form, skillCategory: e.target.value as SkillCategory })}
            >
              <option value="">Select skill</option>
              {Object.entries(SKILL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-3">
            Preferred Language / ಆದ್ಯತೆಯ ಭಾಷೆ
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "kannada", label: "ಕನ್ನಡ", sub: "Kannada" },
              { value: "hindi", label: "हिंदी", sub: "Hindi" },
              { value: "english", label: "English", sub: "English" },
            ].map((lang) => (
              <button
                key={lang.value}
                onClick={() => setForm({ ...form, preferredLanguage: lang.value as Language })}
                className={`p-3 rounded-lg border text-center transition-all ${
                  form.preferredLanguage === lang.value
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-[var(--border)] hover:border-blue-500/50 text-[var(--muted-foreground)]"
                }`}
              >
                <div className="font-semibold text-sm">{lang.label}</div>
                <div className="text-xs opacity-70">{lang.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!valid}
          onClick={() => onNext(form)}
        >
          Continue to Interview
        </Button>
      </Card>
    </motion.div>
  );
}
