import { Sprint } from "@/data/cycleTimeData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface StoryPointsChartProps {
  sprint: Sprint;
}

const StoryPointsChart = ({ sprint }: StoryPointsChartProps) => {
  const totalEstimated = sprint.stories.reduce((sum, s) => sum + s.storyPoints, 0);
  const totalDelivered = sprint.stories
    .filter((s) => s.done)
    .reduce((sum, s) => sum + s.storyPoints, 0);

  const data = [
    { name: "Story Points", estimado: totalEstimated, entregue: totalDelivered },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <span className="text-sm text-muted-foreground">Estimado:</span>
          <span className="text-sm font-bold text-foreground">{totalEstimated} SP</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
          <span className="text-sm text-muted-foreground">Entregue:</span>
          <span className="text-sm font-bold text-primary">{totalDelivered} SP</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <span className="text-sm text-muted-foreground">Taxa:</span>
          <span className="text-sm font-bold text-foreground">
            {totalEstimated > 0 ? Math.round((totalDelivered / totalEstimated) * 100) : 0}%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={16}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="estimado" name="Estimado" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} barSize={60} />
          <Bar dataKey="entregue" name="Entregue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StoryPointsChart;
