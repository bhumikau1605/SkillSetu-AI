import Link from "next/link";
import { Brain, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SidebarNav } from "@/components/dashboard/SidebarNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Sidebar — static shell, only SidebarNav is client */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen border-r border-[var(--border)] bg-[var(--card)] fixed left-0 top-0 bottom-0 z-30">
        <div className="p-5 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">SkillSetu AI</span>
          </Link>
        </div>

        <SidebarNav />

        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--muted)]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs text-white font-bold">
              A
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--foreground)]">Admin Officer</p>
              <p className="text-xs text-[var(--muted-foreground)]">Karnataka Govt</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
          <div className="px-6 h-16 flex items-center justify-between">
            <p className="text-xs text-[var(--muted-foreground)]">
              Karnataka Workforce Assessment Platform
            </p>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/interview"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Interview
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
