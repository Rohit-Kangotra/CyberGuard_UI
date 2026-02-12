import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import SummaryCards from "@/components/SummaryCards";
import VulnerabilityTable from "@/components/VulnerabilityTable";
import SeverityChart from "@/components/SeverityChart";
import TrendChart from "@/components/TrendChart";
import ErrorBanner from "@/components/ErrorBanner";
import { useVulnerabilities, useVulnerabilitySummary } from "@/hooks/useVulnerabilities";
import { useState } from "react";

const Index = () => {
  const queryClient = useQueryClient();
  const vulnQuery = useVulnerabilities();
  const summaryQuery = useVulnerabilitySummary();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] });
    await queryClient.invalidateQueries({ queryKey: ["vulnerability-summary"] });
    setIsRefreshing(false);
  };

  const hasError = vulnQuery.isError || summaryQuery.isError;

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-mono text-xl font-bold tracking-tight md:text-2xl">
              Threat Dashboard
            </h2>
            <p className="mt-1 text-xs text-muted-foreground font-mono">
              Real-time vulnerability monitoring
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-mono text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {hasError && (
          <ErrorBanner
            message="Failed to fetch vulnerability data. Please try again."
            onRetry={handleRefresh}
          />
        )}

        {/* Summary Cards */}
        <SummaryCards data={summaryQuery.data} isLoading={summaryQuery.isLoading} />

        {/* Charts + Table */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <SeverityChart data={summaryQuery.data} isLoading={summaryQuery.isLoading} />
            <TrendChart data={vulnQuery.data} isLoading={vulnQuery.isLoading} />
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-4 md:p-5">
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Vulnerability Registry
              </h3>
              <VulnerabilityTable data={vulnQuery.data} isLoading={vulnQuery.isLoading} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
