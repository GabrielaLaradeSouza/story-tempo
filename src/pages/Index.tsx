import { useState } from "react";
import { sprints } from "@/data/cycleTimeData";
import CycleTimeList from "@/components/CycleTimeList";
import CycleTimeByStageChart from "@/components/CycleTimeByStageChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timer, BarChart3, PieChart } from "lucide-react";

const Index = () => {
  const [selectedSprintId, setSelectedSprintId] = useState(sprints[0].id);
  const selectedSprint = sprints.find((s) => s.id === selectedSprintId)!;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Cycle Time
            </h1>
            <p className="text-muted-foreground mt-1">
              Medir o tempo de execução das histórias dentro da sprint
            </p>
          </div>
          <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sprints.map((sprint) => (
                <SelectItem key={sprint.id} value={sprint.id}>
                  {sprint.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Section 1: Cycle Time List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Cycle Time por Story
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Cycle Time (dias) = Data de entrada em In Progress até Done · Apenas dias úteis
          </p>
          <CycleTimeList sprint={selectedSprint} />
        </section>

        {/* Section 2: Cycle Time por Etapa */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Cycle Time por Etapa
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Entender onde o tempo está sendo consumido dentro do fluxo
          </p>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <CycleTimeByStageChart sprint={selectedSprint} />
          </div>
        </section>
        {/* Section 3: Issue Type Breakdown */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Distribuição por Tipo de Issue
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Quantidade e story points por tipo de issue na sprint
          </p>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <IssueTypeBreakdownChart sprint={selectedSprint} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
