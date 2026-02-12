import { type Severity } from "@/services/vulnerabilityApi";

const severityConfig: Record<Severity, { bg: string; text: string; dot: string }> = {
  Critical: { bg: "bg-severity-critical/15", text: "text-severity-critical", dot: "bg-severity-critical" },
  High: { bg: "bg-severity-high/15", text: "text-severity-high", dot: "bg-severity-high" },
  Medium: { bg: "bg-severity-medium/15", text: "text-severity-medium", dot: "bg-severity-medium" },
  Low: { bg: "bg-severity-low/15", text: "text-severity-low", dot: "bg-severity-low" },
};

interface SeverityBadgeProps {
  severity: Severity;
}

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const config = severityConfig[severity];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium ${config.bg} ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {severity}
    </span>
  );
};

export default SeverityBadge;
