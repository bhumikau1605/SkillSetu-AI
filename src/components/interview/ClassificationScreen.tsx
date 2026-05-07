"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AIScores, WorkforceStatus } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/mockData";
import Link from "next/link";
import {
  CheckCircle, BookOpen, Eye, HelpCircle, AlertTriangle,
  Download, Home, BarChart3, Star
} from "lucide-react";

interface Props {
  status: WorkforceStatus;
  scores: AIScores;
  candidateName: string;
  candidateId: string;
}

const STATUS_ICONS = {
  job_ready: CheckCircle,
  requires_training: BookOpen,
  manual_verification: Eye,
  low_confidence: HelpCircle,
  fraud_risk: AlertTriangle,
};

const STATUS_RECOMMENDATIONS: Record<WorkforceStatus, string[]> = {
  job_ready: [
    "Eligible for immediate job placement",
    "Connect with employer database",
    "Schedule onboarding process",
  ],
  requires_training: [
    "Enroll in skill development program",
    "3-6 month training recommended",
    "Re-assess after training completion",
  ],
  manual_verification: [
    "Schedule in-person verification",
    "Document verification required",
    "Assign to district officer for review",
  ],
  low_confidence: [
    "Re-interview recommended",
    "Provide interview preparation support",
    "Language assistance may be needed",
  ],
  fraud_risk: [
    "Flag for investigation",
    "Do not proceed with placement",
    "Report to fraud detection team",
  ],
};

export function ClassificationScreen({ status, scores, candidateName, candidateId }: Props) {
  const config = STATUS_CONFIG[status];
  const Icon = STATUS_ICONS[status];
  const recommendations = STATUS_RECOMMENDATIONS[status];

  const handleExport = () => {
    const report = {
      candidateId,
      candidateName,
      status,
      scores,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${candidateId}-report.json`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Main Status Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        <Card className={`p-8 text-center border ${config.bg}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${config.bg}`}
          >
            <Icon className={`w-10 h-10 ${config.color}`} />
          </motion.div>

          <Badge
            variant={
              status === "job_ready" ? "success" :
              status === "fraud_risk" ? "danger" :
              status === "requires_training" ? "warning" : "info"
            }
            className="text-sm px-4 py-1 mb-4"
          >
            {config.label}
          </Badge>

          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            {candidateName}
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-1">
            Candidate ID: <span className="font-mono text-[var(--foreground)]">{candidateId}</span>
          </p>
          <p className="text-[var(--muted-foreground)] text-sm">
            Overall Score:{" "}
            <span className="font-bold text-blue-400 text-lg">{scores.overall}%</span>
          </p>
        </Card>
      </motion.div>

      {/* Score Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Communication", value: scores.communication },
          { label: "Confidence", value: scores.confidence },
          { label: "Relevance", value: scores.relevance },
          { label: "Authenticity", value: scores.authenticity },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Card className="p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{item.value}%</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">{item.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-[var(--foreground)]">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-blue-400 font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-[var(--foreground)]">{rec}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" onClick={handleExport} variant="outline">
          <Download className="w-4 h-4" /> Export Report
        </Button>
        <Link href="/admin" className="flex-1">
          <Button className="w-full" variant="secondary">
            <BarChart3 className="w-4 h-4" /> View Dashboard
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button className="w-full">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
