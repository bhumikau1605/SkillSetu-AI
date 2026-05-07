"use client";
import { useState } from "react";
import { CandidateTable } from "@/components/dashboard/CandidateTable";
import { getCandidates } from "@/lib/store";
import { WorkforceStatus } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, CheckCircle, Clock, Filter } from "lucide-react";

const STATUS_FILTERS: { label: string; value: WorkforceStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Job Ready", value: "job_ready" },
  { label: "Needs Training", value: "requires_training" },
  { label: "Manual Review", value: "manual_verification" },
  { label: "Low Confidence", value: "low_confidence" },
  { label: "Fraud Risk", value: "fraud_risk" },
];

export default function CandidatesPage() {
  const [statusFilter, setStatusFilter] = useState<WorkforceStatus | "all">("all");
  const allCandidates = getCandidates();

  const filtered = statusFilter === "all"
    ? allCandidates
    : allCandidates.filter((c) => c.status === statusFilter);

  const completed = allCandidates.filter((c) => c.interviewCompleted).length;
  const pending = allCandidates.filter((c) => !c.interviewCompleted).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Total Registered", value: allCandidates.length, color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: CheckCircle, label: "Interviewed", value: completed, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: Clock, label: "Pending Interview", value: pending, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((s) => (
          <Card key={s.label} className="p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              statusFilter === f.value
                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-500/30 hover:text-[var(--foreground)]"
            }`}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 opacity-60">
                {allCandidates.filter((c) => c.status === f.value).length}
              </span>
            )}
          </button>
        ))}
        {statusFilter !== "all" && <Badge variant="info">{filtered.length} results</Badge>}
      </div>

      <CandidateTable candidates={filtered} />
    </div>
  );
}
