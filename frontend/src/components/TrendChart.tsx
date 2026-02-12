import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { type Vulnerability } from "@/services/vulnerabilityApi";

interface TrendChartProps {
  data: Vulnerability[] | undefined;
  isLoading: boolean;
}

const TrendChart = ({ data, isLoading }: TrendChartProps) => {
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full rounded-lg bg-muted" />;
  }

  if (!data) return null;

  // Aggregate vulnerabilities by date
  const dateMap = new Map<string, number>();
  data.forEach((vuln) => {
    const count = dateMap.get(vuln.reportedDate) || 0;
    dateMap.set(vuln.reportedDate, count + 1);
  });

  // Sort by date and create chart data
  const chartData = Array.from(dateMap.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, count]) => ({ date, count }));

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-5">
      <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Report Trend
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsla(222, 30%, 18%, 0.8)" vertical={false} />
          <XAxis
            dataKey="date"
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
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(190, 100%, 50%)"
            strokeWidth={2}
            dot={{ fill: "hsl(190, 100%, 50%)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
