import { useQuery } from "@tanstack/react-query";
import { fetchVulnerabilities, fetchSummary } from "@/services/vulnerabilityApi";

export function useVulnerabilities() {
  return useQuery({
    queryKey: ["vulnerabilities"],
    queryFn: fetchVulnerabilities,
  });
}

export function useVulnerabilitySummary() {
  return useQuery({
    queryKey: ["vulnerability-summary"],
    queryFn: fetchSummary,
  });
}
