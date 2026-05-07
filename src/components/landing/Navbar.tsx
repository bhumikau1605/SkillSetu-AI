"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">SkillSetu AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
          <Link href="#features" className="hover:text-[var(--foreground)] transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">How it Works</Link>
          <Link href="/admin" className="hover:text-[var(--foreground)] transition-colors">Admin</Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/interview">
            <Button size="sm">Start Interview</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
