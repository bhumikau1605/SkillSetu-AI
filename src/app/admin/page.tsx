"use client";
import { useState } from "react";
import Link from "next/link";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { CandidateTable } from "@/components/dashboard/CandidateTable";
import { getCandidates, getStats, resetData } from "@/lib/store";

export default function AdminDashboardPage() {
  const [tick, setTick] = useState(0);
  const stats = getStats();
  const candidates = getCandidates();

  const handleRefresh = () => {
    resetData();
    setTick((t) => t + 1);
  };

  const handleExport = () => {
    const data = { stats, candidates, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skillsetu-dashboard-report.json";
    a.click();
  };

  return (
    <div className="space-y-6" key={tick}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>
      </div>

      {stats.fraudFlags > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-sm text-red-400">
            <span className="font-semibold">{stats.fraudFlags} high-risk candidates</span> flagged for fraud review.
          </p>
          <Link href="/admin/fraud" className="ml-auto">
            <Button size="sm" variant="danger">Review Now</Button>
          </Link>
        </div>
      )}

      <StatsCards
        totalCandidates={stats.totalCandidates}
        jobReady={stats.jobReady}
        fraudFlags={stats.fraudFlags}
        pendingReviews={stats.pendingReviews}
      />
      <DashboardCharts stats={stats} />
      <CandidateTable candidates={candidates} />
    </div>
  );
}
