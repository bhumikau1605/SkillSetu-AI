"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Brain } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-6">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Ready to assess Karnataka&apos;s{" "}
              <span className="gradient-text">skilled workforce?</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">
              Start with a candidate interview or explore the admin dashboard to see
              AI-powered workforce intelligence in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/interview">
                <Button size="lg">
                  Begin Interview <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-[var(--foreground)]">SkillSetu AI</span>
          </div>
          <p>&copy; 2026 Karnataka Government Workforce Initiative &middot; TwinLogic Hackathon Prototype</p>
          <div className="flex gap-4">
            <Link href="/interview" className="hover:text-[var(--foreground)] transition-colors">Interview</Link>
            <Link href="/admin" className="hover:text-[var(--foreground)] transition-colors">Dashboard</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
