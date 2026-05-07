"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { Candidate } from "@/lib/types";
import {
  STATUS_CONFIG, FRAUD_CONFIG, SKILL_LABELS, LANGUAGE_LABELS
} from "@/lib/mockData";
import {
  Search, X, Eye, Brain, Shield, FileText,
  ChevronUp, ChevronDown
} from "lucide-react";

interface Props {
  candidates: Candidate[];
}

function CandidateModal({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
  const scores = candidate.scores!;
  const statusCfg = STATUS_CONFIG[candidate.status!];
  const fraudCfg = FRAUD_CONFIG[candidate.fraudRisk!];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[var(--border)] flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">{candidate.name}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {candidate.id} · {candidate.district}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
              {statusCfg.label}
            </span>
            <button onClick={onClose} className="p-1.5 hover:bg-[var(--muted)] rounded-lg transition-colors">
              <X className="w-4 h-4 text-[var(--muted-foreground)]" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Info */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Skill", value: SKILL_LABELS[candidate.skillCategory] },
              { label: "Language", value: LANGUAGE_LABELS[candidate.preferredLanguage] },
              { label: "Fraud Risk", value: fraudCfg.label, color: fraudCfg.color },
            ].map((item) => (
              <div key={item.label} className="bg-[var(--muted)] rounded-lg p-3">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">{item.label}</p>
                <p className={`text-sm font-semibold ${item.color || "text-[var(--foreground)]"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Scores */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-blue-400" />
              <h4 className="font-semibold text-[var(--foreground)] text-sm">AI Score Breakdown</h4>
              <span className="ml-auto text-blue-400 font-bold">{scores.overall}% overall</span>
            </div>
            <div className="space-y-3">
              <ScoreBar label="Communication" score={scores.communication} delay={0.1} />
              <ScoreBar label="Confidence" score={scores.confidence} delay={0.2} />
              <ScoreBar label="Relevance" score={scores.relevance} delay={0.3} />
              <ScoreBar label="Authenticity" score={scores.authenticity} delay={0.4} />
            </div>
          </div>

          {/* Fraud Flags */}
          {scores.fraudFlags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-red-400" />
                <h4 className="font-semibold text-[var(--foreground)] text-sm">Risk Indicators</h4>
              </div>
              <div className="space-y-2">
                {scores.fraudFlags.map((flag, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <Badge variant={flag.severity === "high" ? "danger" : flag.severity === "medium" ? "warning" : "muted"}>
                      {flag.severity}
                    </Badge>
                    <div>
                      <p className="text-xs font-medium text-[var(--foreground)]">{flag.type}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transcript */}
          {candidate.transcript && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[var(--muted-foreground)]" />
                <h4 className="font-semibold text-[var(--foreground)] text-sm">Interview Transcript</h4>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] bg-[var(--muted)] rounded-lg p-4 leading-relaxed">
                {candidate.transcript}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CandidateTable({ candidates }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [sortField, setSortField] = useState<"name" | "score">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = candidates
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.district.toLowerCase().includes(search.toLowerCase()) ||
        SKILL_LABELS[c.skillCategory].toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "score") {
        const aScore = a.scores?.overall ?? 0;
        const bScore = b.scores?.overall ?? 0;
        return sortDir === "asc" ? aScore - bScore : bScore - aScore;
      }
      return sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  const toggleSort = (field: "name" | "score") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: "name" | "score" }) =>
    sortField === field ? (
      sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
    ) : null;

  return (
    <>
      <Card>
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between gap-4">
          <h3 className="font-semibold text-[var(--foreground)]">
            Candidates ({filtered.length})
          </h3>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--muted)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {[
                  { label: "Name", field: "name" as const, sortable: true },
                  { label: "District", sortable: false },
                  { label: "Skill", sortable: false },
                  { label: "Language", sortable: false },
                  { label: "Score", field: "score" as const, sortable: true },
                  { label: "Fraud Risk", sortable: false },
                  { label: "Status", sortable: false },
                  { label: "", sortable: false },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] ${
                      col.sortable ? "cursor-pointer hover:text-[var(--foreground)] select-none" : ""
                    }`}
                    onClick={() => col.sortable && col.field && toggleSort(col.field)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && col.field && <SortIcon field={col.field} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const statusCfg = c.status ? STATUS_CONFIG[c.status] : null;
                const fraudCfg = c.fraudRisk ? FRAUD_CONFIG[c.fraudRisk] : null;
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{c.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{c.district.split(" ")[0]}</td>
                    <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{SKILL_LABELS[c.skillCategory]}</td>
                    <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{LANGUAGE_LABELS[c.preferredLanguage]}</td>
                    <td className="px-4 py-3">
                      {c.scores ? (
                        <span className={`text-sm font-bold ${
                          c.scores.overall >= 80 ? "text-emerald-400" :
                          c.scores.overall >= 60 ? "text-amber-400" : "text-red-400"
                        }`}>
                          {c.scores.overall}%
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {fraudCfg ? (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${fraudCfg.bg} ${fraudCfg.color}`}>
                          {fraudCfg.label}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {statusCfg ? (
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]">Not interviewed</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {c.interviewCompleted && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelected(c)}
                          className="text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {selected && (
          <CandidateModal candidate={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
