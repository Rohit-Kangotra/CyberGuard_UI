import { type Status } from "@/services/vulnerabilityApi";

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isOpen = status === "Open";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium ${
        isOpen
          ? "bg-destructive/10 text-destructive"
          : "bg-accent/10 text-accent"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-destructive animate-pulse-glow" : "bg-accent"}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
