import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { type VulnerabilitySummary } from "@/services/vulnerabilityApi";

interface SeverityChartProps {
  data: VulnerabilitySummary | undefined;
  isLoading: boolean;
}

const COLORS: Record<string, string> = {
  Critical: "hsl(0, 85%, 55%)",
  High: "hsl(25, 95%, 55%)",
  Medium: "hsl(45, 100%, 50%)",
  Low: "hsl(185, 100%, 50%)",
};

const SeverityChart = ({ data, isLoading }: SeverityChartProps) => {
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full rounded-lg bg-muted" />;
  }

  if (!data) return null;

  const chartData = [
    { name: "Critical", count: data.critical },
    { name: "High", count: data.high },
    { name: "Medium", count: data.medium },
    { name: "Low", count: data.low },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-5">
      <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Severity Distribution
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsla(222, 30%, 18%, 0.8)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "hsl(222, 30%, 18%)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 44%, 9%)",
              border: "1px solid hsl(222, 30%, 18%)",
              borderRadius: "6px",
              fontFamily: "JetBrains Mono",
              fontSize: "12px",
              color: "hsl(190, 100%, 95%)",
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeverityChart;
