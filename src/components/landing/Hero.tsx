"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, Shield, Zap, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-[var(--background)] to-violet-950/30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          Karnataka Government Initiative &middot; AI-Powered
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-[var(--foreground)]">AI Workforce</span>
          <br />
          <span className="gradient-text">Intelligence Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-4"
        >
          Multilingual AI interviews for Karnataka&apos;s workforce. Assess, classify,
          and connect skilled workers with opportunities &mdash; in Kannada, Hindi, or English.
        </motion.p>

        {/* Kannada tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-amber-400/80 font-medium mb-10"
        >
          ಕರ್ನಾಟಕದ ಕಾರ್ಮಿಕರಿಗಾಗಿ AI ಮೌಲ್ಯಮಾಪನ ವ್ಯವಸ್ಥೆ
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/interview">
            <Button size="lg" className="gap-2">
              Start Your Interview <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="w-4 h-4" /> View Admin Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16"
        >
          {[
            { value: "3", label: "Languages" },
            { value: "10+", label: "Skill Categories" },
            { value: "30", label: "Districts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]"
        >
          {[
            { icon: Shield, text: "Fraud Detection" },
            { icon: Globe, text: "Multilingual AI" },
            { icon: Zap, text: "Real-time Analysis" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-blue-400" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
