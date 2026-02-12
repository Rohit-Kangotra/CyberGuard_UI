import { AlertTriangle } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
      <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
      <p className="flex-1 text-sm text-destructive">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-mono text-destructive transition-colors hover:bg-destructive/20"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
