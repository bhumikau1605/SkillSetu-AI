import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillSetu AI — Karnataka Workforce Intelligence Platform",
  description:
    "AI-powered multilingual workforce assessment platform for Karnataka government. Conduct video interviews, evaluate candidates, and classify workforce readiness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
