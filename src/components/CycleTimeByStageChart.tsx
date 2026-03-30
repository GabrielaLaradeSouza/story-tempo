import { Sprint } from "@/data/cycleTimeData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CycleTimeByStageChartProps {
  sprint: Sprint;
}

const STAGE_COLORS = ["hsl(220, 70%, 50%)", "hsl(160, 60%, 45%)"];

const CycleTimeByStageChart = ({ sprint }: CycleTimeByStageChartProps) => {
  const completedStories = sprint.stories;

  const avgInProgress =
    completedStories.reduce((sum, s) => sum + s.inProgressDays, 0) /
    completedStories.length;
  const avgCodeReview =
    completedStories.reduce((sum, s) => sum + s.codeReviewDays, 0) /
    completedStories.length;

  const data = [
    { stage: "In Progress", avgDays: parseFloat(avgInProgress.toFixed(1)) },
    { stage: "Code Review", avgDays: parseFloat(avgCodeReview.toFixed(1)) },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tempo médio por etapa considerando {completedStories.length} stories concluídas
      </p>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
            <XAxis
              dataKey="stage"
              tick={{ fontSize: 13, fill: "hsl(220, 15%, 40%)" }}
              axisLine={{ stroke: "hsl(220, 15%, 85%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(220, 15%, 50%)" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Tempo médio (dias)",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "hsl(220, 15%, 50%)" },
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(220, 15%, 90%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [`${value} dias`, "Tempo médio"]}
            />
            <Bar dataKey="avgDays" radius={[8, 8, 0, 0]} barSize={80}>
              {data.map((_, index) => (
                <Cell key={index} fill={STAGE_COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CycleTimeByStageChart;
