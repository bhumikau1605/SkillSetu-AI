"use client";
import { Card } from "@/components/ui/Card";
import { Users, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface Props {
  totalCandidates: number;
  jobReady: number;
  fraudFlags: number;
  pendingReviews: number;
}

const stats = (props: Props) => [
  {
    label: "Total Candidates",
    value: props.totalCandidates,
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    change: "+12 this week",
    changeColor: "text-emerald-400",
  },
  {
    label: "Job Ready",
    value: props.jobReady,
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    change: `${Math.round((props.jobReady / props.totalCandidates) * 100)}% of total`,
    changeColor: "text-emerald-400",
  },
  {
    label: "Fraud Flags",
    value: props.fraudFlags,
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    change: "Requires review",
    changeColor: "text-red-400",
  },
  {
    label: "Pending Reviews",
    value: props.pendingReviews,
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    change: "Awaiting interview",
    changeColor: "text-amber-400",
  },
];

export function StatsCards(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats(props).map((stat) => (
        <Card key={stat.label} hover className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{stat.value}</div>
          <div className="text-sm text-[var(--muted-foreground)] mb-1">{stat.label}</div>
          <div className={`text-xs ${stat.changeColor}`}>{stat.change}</div>
        </Card>
      ))}
    </div>
  );
}
