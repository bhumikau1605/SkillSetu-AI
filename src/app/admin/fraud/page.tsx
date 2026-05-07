"use client";
import { getCandidates } from "@/lib/store";
import { SKILL_LABELS } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { ShieldAlert, AlertTriangle, Users, Eye, Mic, Copy, CheckCircle, TrendingUp } from "lucide-react";

const FRAUD_TYPES = [
  { icon: Users, title: "Multiple Faces Detected", desc: "More than one person visible in the camera frame during interview.", severity: "high" as const, count: 2 },
  { icon: Mic, title: "Audio Inconsistency", desc: "Voice pattern mismatch detected — possible coached or pre-recorded audio.", severity: "medium" as const, count: 3 },
  { icon: Eye, title: "Low Face Visibility", desc: "Candidate face was partially or fully obscured during the session.", severity: "low" as const, count: 4 },
  { icon: Copy, title: "Duplicate Candidate", desc: "Same phone number or biometric signature found in another submission.", severity: "high" as const, count: 1 },
];

const SEVERITY_CONFIG = {
  high: { variant: "danger" as const, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  medium: { variant: "warning" as const, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  low: { variant: "muted" as const, color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20" },
};

export default function FraudDetectionPage() {
  const candidates = getCandidates().filter((c) => c.interviewCompleted && c.fraudRisk !== "low");
  const highRisk = candidates.filter((c) => c.fraudRisk === "high");
  const mediumRisk = candidates.filter((c) => c.fraudRisk === "medium");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Flagged", value: candidates.length, icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "High Risk", value: highRisk.length, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Medium Risk", value: mediumRisk.length, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Cleared", value: 20 - candidates.length, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Fraud Type Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FRAUD_TYPES.map((ft) => {
            const cfg = SEVERITY_CONFIG[ft.severity];
            return (
              <Card key={ft.title} className={`p-5 border ${cfg.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                      <ft.icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{ft.title}</p>
                      <Badge variant={cfg.variant} className="mt-1">{ft.severity} severity</Badge>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold ${cfg.color}`}>{ft.count}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{ft.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Flagged Candidates ({candidates.length})</h3>
        <div className="space-y-3">
          {candidates.map((c) => {
            const cfg = SEVERITY_CONFIG[c.fraudRisk!];
            return (
              <Card key={c.id} className={`p-5 border ${cfg.bg}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">{c.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {c.id} &middot; {c.district} &middot; {SKILL_LABELS[c.skillCategory]}
                        </p>
                      </div>
                      <Badge variant={cfg.variant} className="ml-auto">{c.fraudRisk} risk</Badge>
                    </div>
                    {c.scores?.fraudFlags && c.scores.fraudFlags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {c.scores.fraudFlags.map((flag, fi) => (
                          <div key={fi} className="flex items-center gap-1.5 text-xs bg-[var(--muted)] rounded-full px-2.5 py-1">
                            <AlertTriangle className={`w-3 h-3 ${flag.severity === "high" ? "text-red-400" : flag.severity === "medium" ? "text-amber-400" : "text-slate-400"}`} />
                            {flag.type}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="max-w-xs">
                      <ScoreBar label="Fraud Risk Score" score={c.scores?.fraudScore ?? 0} />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
