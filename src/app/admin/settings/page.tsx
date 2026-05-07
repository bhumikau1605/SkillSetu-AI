"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Brain, Globe, Shield, Bell, Save, CheckCircle } from "lucide-react";

const LANGUAGES = [
  { value: "kannada", label: "ಕನ್ನಡ", sub: "Kannada", default: true },
  { value: "hindi", label: "हिंदी", sub: "Hindi", default: false },
  { value: "english", label: "English", sub: "English", default: false },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-blue-500" : "bg-[var(--muted)]"}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    fraudDetection: true,
    autoClassify: true,
    emailAlerts: false,
    smsAlerts: true,
    requireVerification: true,
    kannadaDefault: true,
    recordTranscripts: true,
    fraudThreshold: "65",
    interviewDuration: "30",
    maxRetries: "2",
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
        >
          <CheckCircle className="w-4 h-4" /> Settings saved successfully.
        </motion.div>
      )}

      {/* AI Engine */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Brain className="w-4 h-4 text-blue-400" />
          <h3 className="font-semibold text-[var(--foreground)]">AI Engine</h3>
          <Badge variant="info" className="ml-auto">Active</Badge>
        </div>
        <div className="space-y-5">
          {[
            { key: "fraudDetection" as const, label: "Fraud Detection", desc: "Automatically flag suspicious interview sessions" },
            { key: "autoClassify" as const, label: "Auto Classification", desc: "Classify candidates automatically after interview" },
            { key: "recordTranscripts" as const, label: "Record Transcripts", desc: "Save AI-generated transcripts for each interview" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
              <Toggle checked={settings[item.key] as boolean} onChange={() => toggle(item.key)} />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--border)]">
            {[
              { key: "fraudThreshold", label: "Fraud Score Threshold (%)", min: 0, max: 100 },
              { key: "interviewDuration", label: "Max Answer Duration (sec)", min: 10, max: 120 },
              { key: "maxRetries", label: "Max Re-record Attempts", min: 1, max: 5 },
            ].slice(0, 2).map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-[var(--muted-foreground)] mb-1.5">{f.label}</label>
                <input
                  type="number"
                  min={f.min}
                  max={f.max}
                  value={settings[f.key as keyof typeof settings] as string}
                  onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[var(--muted)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Language */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-[var(--foreground)]">Language Settings</h3>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">
          Select which languages are available for candidate interviews.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.value}
              className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                lang.default
                  ? "border-amber-500/40 bg-amber-500/10"
                  : "border-[var(--border)] hover:border-blue-500/30"
              }`}
            >
              <p className="font-semibold text-[var(--foreground)]">{lang.label}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{lang.sub}</p>
              {lang.default && <Badge variant="warning" className="mt-2 text-xs">Default</Badge>}
            </div>
          ))}
        </div>
      </Card>

      {/* Fraud Detection */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-red-400" />
          <h3 className="font-semibold text-[var(--foreground)]">Fraud Detection Rules</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Multiple Face Detection", desc: "Flag sessions where more than one face is detected" },
            { label: "Audio Inconsistency Check", desc: "Detect pre-recorded or coached audio responses" },
            { label: "Duplicate Submission Check", desc: "Block duplicate phone numbers or biometric matches" },
            { label: "Require Manual Review on High Risk", desc: "Auto-route high-risk candidates to manual review queue" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-violet-400" />
          <h3 className="font-semibold text-[var(--foreground)]">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "emailAlerts" as const, label: "Email Alerts", desc: "Send email on fraud flags and new completions" },
            { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Send SMS to candidate after classification" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
              <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </Card>

      <Button size="lg" onClick={handleSave} className="w-full sm:w-auto">
        <Save className="w-4 h-4" /> Save Settings
      </Button>
    </div>
  );
}
