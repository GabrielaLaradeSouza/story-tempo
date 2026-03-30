import { Sprint, IssueType } from "@/data/cycleTimeData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IssueTypeBreakdownChartProps {
  sprint: Sprint;
}

const COLORS: Record<IssueType, string> = {
  Story: "hsl(217, 91%, 60%)",
  Bug: "hsl(0, 84%, 60%)",
  Task: "hsl(271, 91%, 65%)",
  Improvement: "hsl(168, 76%, 42%)",
};

const IssueTypeBreakdownChart = ({ sprint }: IssueTypeBreakdownChartProps) => {
  const issueTypes: IssueType[] = ["Story", "Bug", "Task", "Improvement"];

  const data = issueTypes
    .map((type) => {
      const stories = sprint.stories.filter((s) => s.issueType === type);
      if (stories.length === 0) return null;
      return {
        type,
        quantity: stories.length,
        storyPoints: stories.reduce((sum, s) => sum + s.storyPoints, 0),
        fill: COLORS[type],
      };
    })
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* By Quantity */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Por Quantidade
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="type" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value}`, "Quantidade"]}
            />
            <Bar dataKey="quantity" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry: any, index: number) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* By Story Points */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Por Story Points
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="type" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value} SP`, "Story Points"]}
            />
            <Bar dataKey="storyPoints" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry: any, index: number) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueTypeBreakdownChart;
