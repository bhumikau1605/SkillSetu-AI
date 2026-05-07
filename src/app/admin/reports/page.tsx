"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getCandidates, getStats } from "@/lib/store";
import { Download, FileBarChart, Users, ShieldAlert, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const REPORTS = [
  { icon: Users, title: "Full Candidate Report", desc: "All registered candidates with scores, status, and interview details.", badge: "JSON", badgeVariant: "info" as const, color: "text-blue-400", bg: "bg-blue-500/10", filename: "candidates-full-report.json" },
  { icon: CheckCircle, title: "Job Ready Candidates", desc: "Filtered list of candidates classified as Job Ready for employer matching.", badge: "JSON", badgeVariant: "success" as const, color: "text-emerald-400", bg: "bg-emerald-500/10", filename: "job-ready-candidates.json" },
  { icon: ShieldAlert, title: "Fraud Risk Report", desc: "All flagged candidates with fraud scores and risk indicators.", badge: "JSON", badgeVariant: "danger" as const, color: "text-red-400", bg: "bg-red-500/10", filename: "fraud-risk-report.json" },
  { icon: FileBarChart, title: "District-wise Summary", desc: "Candidate counts, classification breakdown, and language stats by district.", badge: "JSON", badgeVariant: "warning" as const, color: "text-amber-400", bg: "bg-amber-500/10", filename: "district-summary.json" },
  { icon: TrendingUp, title: "Weekly Trends Report", desc: "Interview volume, completion rates, and classification trends over 7 days.", badge: "JSON", badgeVariant: "muted" as const, color: "text-violet-400", bg: "bg-violet-500/10", filename: "weekly-trends.json" },
  { icon: Calendar, title: "Monthly Assessment Report", desc: "Comprehensive monthly summary for government review and policy decisions.", badge: "JSON", badgeVariant: "muted" as const, color: "text-cyan-400", bg: "bg-cyan-500/10", filename: "monthly-assessment.json" },
];

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

export default function ReportsPage() {
  const stats = getStats();
  const candidates = getCandidates();

  const handleDownload = (filename: string) => {
    const dataMap: Record<string, unknown> = {
      "candidates-full-report.json": { candidates, generatedAt: new Date().toISOString() },
      "job-ready-candidates.json": { candidates: candidates.filter((c) => c.status === "job_ready"), generatedAt: new Date().toISOString() },
      "fraud-risk-report.json": { candidates: candidates.filter((c) => c.fraudRisk !== "low"), generatedAt: new Date().toISOString() },
      "district-summary.json": { districtData: stats.districtData, generatedAt: new Date().toISOString() },
      "weekly-trends.json": { weeklyTrend: stats.weeklyTrend, generatedAt: new Date().toISOString() },
      "monthly-assessment.json": { stats, generatedAt: new Date().toISOString() },
    };
    downloadJSON(dataMap[filename] ?? {}, filename);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Candidates", value: stats.totalCandidates },
          { label: "Job Ready", value: stats.jobReady },
          { label: "Fraud Flags", value: stats.fraudFlags },
          { label: "Pending", value: stats.pendingReviews },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-4">Weekly Interview Volume</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={stats.weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="interviews" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Interviews" />
            <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((r) => (
            <Card key={r.title} hover className="p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg ${r.bg} flex items-center justify-center`}>
                  <r.icon className={`w-5 h-5 ${r.color}`} />
                </div>
                <Badge variant={r.badgeVariant}>{r.badge}</Badge>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--foreground)] text-sm mb-1">{r.title}</p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{r.desc}</p>
              </div>
              <Button size="sm" variant="outline" className="w-full" onClick={() => handleDownload(r.filename)}>
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
