"use client";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border",
        glass
          ? "bg-white/5 border-white/10 backdrop-blur-sm"
          : "bg-[var(--card)] border-[var(--border)]",
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pb-3", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pt-3", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("font-semibold text-[var(--foreground)]", className)}>{children}</h3>;
}
