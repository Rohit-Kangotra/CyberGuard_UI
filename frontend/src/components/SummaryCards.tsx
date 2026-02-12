import { Skeleton } from "@/components/ui/skeleton";
import { type VulnerabilitySummary } from "@/services/vulnerabilityApi";
import { Shield, AlertTriangle, AlertCircle, Info, Activity } from "lucide-react";

interface SummaryCardsProps {
  data: VulnerabilitySummary | undefined;
  isLoading: boolean;
}

const cards = [
  { key: "total" as const, label: "Total Vulnerabilities", icon: Activity, colorClass: "text-primary", borderClass: "border-primary/30", glowClass: "glow-cyan" },
  { key: "critical" as const, label: "Critical", icon: Shield, colorClass: "text-severity-critical", borderClass: "border-severity-critical/30", glowClass: "glow-critical" },
  { key: "high" as const, label: "High", icon: AlertTriangle, colorClass: "text-severity-high", borderClass: "border-severity-high/30", glowClass: "" },
  { key: "medium" as const, label: "Medium", icon: AlertCircle, colorClass: "text-severity-medium", borderClass: "border-severity-medium/30", glowClass: "" },
  { key: "low" as const, label: "Low", icon: Info, colorClass: "text-severity-low", borderClass: "border-severity-low/30", glowClass: "" },
];

const SummaryCards = ({ data, isLoading }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 md:gap-4">
      {cards.map((card, i) => (
        <div
          key={card.key}
          className={`group relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-opacity-60 md:p-5 ${card.borderClass}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <card.icon className={`h-5 w-5 ${card.colorClass} transition-transform duration-300 group-hover:scale-110`} />
          </div>
          <div className="mt-3">
            {isLoading ? (
              <>
                <Skeleton className="mb-1 h-8 w-16 bg-muted" />
                <Skeleton className="h-3 w-20 bg-muted" />
              </>
            ) : (
              <>
                <p className={`font-mono text-2xl font-bold md:text-3xl ${card.colorClass} animate-count-up`}>
                  {data?.[card.key] ?? 0}
                </p>
                <p className="mt-1 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  {card.label}
                </p>
              </>
            )}
          </div>
          {/* subtle corner accent */}
          <div className={`absolute right-0 top-0 h-8 w-8 translate-x-4 -translate-y-4 rounded-full opacity-20 blur-xl ${card.colorClass} bg-current`} />
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
