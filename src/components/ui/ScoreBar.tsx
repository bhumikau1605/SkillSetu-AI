"use client";
import { motion } from "framer-motion";
import { cn, getScoreBarColor, getScoreColor } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  delay?: number;
  showValue?: boolean;
}

export function ScoreBar({ label, score, delay = 0, showValue = true }: ScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
        {showValue && (
          <span className={cn("text-sm font-semibold", getScoreColor(score))}>
            {Math.round(score)}%
          </span>
        )}
      </div>
      <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getScoreBarColor(score))}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
