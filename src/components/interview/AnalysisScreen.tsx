"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { Button } from "@/components/ui/Button";
import { AIScores } from "@/lib/types";
import { LANGUAGE_LABELS } from "@/lib/mockData";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer
} from "recharts";
import {
  Brain, Shield, AlertTriangle, CheckCircle, ChevronRight, Globe
} from "lucide-react";

interface Props {
  scores: AIScores;
  transcript: string;
  onNext: () => void;
}

export function AnalysisScreen({ scores, transcript, onNext }: Props) {
  const radarData = [
    { subject: "Communication", value: scores.communication },
    { subject: "Confidence", value: scores.confidence },
    { subject: "Relevance", value: scores.relevance },
    { subject: "Authenticity", value: scores.authenticity },
    { subject: "Engagement", value: scores.emotions.engaged },
  ];

  const fraudBadge =
    scores.fraudScore > 65
      ? { variant: "danger" as const, label: "High Risk" }
      : scores.fraudScore > 35
      ? { variant: "warning" as const, label: "Medium Risk" }
      : { variant: "success" as const, label: "Low Risk" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-4"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">AI Analysis Complete</h2>
        <p className="text-[var(--muted-foreground)] text-sm">
          Overall Score:{" "}
          <span className="text-blue-400 font-bold text-lg">{scores.overall}%</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Bars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Performance Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScoreBar label="Communication" score={scores.communication} delay={0.1} />
            <ScoreBar label="Confidence" score={scores.confidence} delay={0.2} />
            <ScoreBar label="Relevance" score={scores.relevance} delay={0.3} />
            <ScoreBar label="Authenticity" score={scores.authenticity} delay={0.4} />
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">AI Confidence Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Radar
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Emotions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Emotion Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(scores.emotions).map(([key, val], i) => (
              <ScoreBar
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                score={val}
                delay={i * 0.1}
              />
            ))}
          </CardContent>
        </Card>

        {/* Fraud + Language */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--muted-foreground)]" />
                <span className="text-sm font-medium text-[var(--foreground)]">Fraud Analysis</span>
              </div>
              <Badge variant={fraudBadge.variant}>{fraudBadge.label}</Badge>
            </div>
            <div className="space-y-2">
              {scores.fraudFlags.length === 0 ? (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> No suspicious activity detected
                </p>
              ) : (
                scores.fraudFlags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--muted)]">
                    <AlertTriangle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      flag.severity === "high" ? "text-red-400" :
                      flag.severity === "medium" ? "text-amber-400" : "text-slate-400"
                    }`} />
                    <div>
                      <p className="text-xs font-medium text-[var(--foreground)]">{flag.type}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{flag.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[var(--muted-foreground)]" />
              <span className="text-sm font-medium text-[var(--foreground)]">Language Detected</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="info" className="text-sm px-3 py-1">
                {LANGUAGE_LABELS[scores.languageDetected]}
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] capitalize">
                {scores.languageDetected}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Transcript */}
      <Card className="p-5">
        <p className="text-sm font-medium text-[var(--foreground)] mb-3">Interview Transcript</p>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed bg-[var(--muted)] rounded-lg p-4">
          {transcript || "Transcript not available."}
        </p>
      </Card>

      <Button className="w-full" size="lg" onClick={onNext}>
        View Final Classification <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
