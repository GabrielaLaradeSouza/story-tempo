import { useState } from "react";
import { sprints as initialSprints, Sprint, Story, IssueType } from "@/data/cycleTimeData";
import CycleTimeList from "@/components/CycleTimeList";
import CycleTimeByStageChart from "@/components/CycleTimeByStageChart";
import IssueTypeBreakdownChart from "@/components/IssueTypeBreakdownChart";
import StoryPointsChart from "@/components/StoryPointsChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timer, BarChart3, PieChart, Plus, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [sprintsData, setSprintsData] = useState<Sprint[]>(initialSprints);
  const [selectedSprintId, setSelectedSprintId] = useState(sprintsData[0].id);
  const selectedSprint = sprintsData.find((s) => s.id === selectedSprintId)!;

  const updateSprint = (updatedSprint: Sprint) => {
    setSprintsData((prev) =>
      prev.map((s) => (s.id === updatedSprint.id ? updatedSprint : s))
    );
  };

  const addSprint = () => {
    const newId = `sprint-${Date.now()}`;
    const newSprint: Sprint = {
      id: newId,
      name: `Sprint ${sprintsData.length + 12}`,
      stories: [],
    };
    setSprintsData((prev) => [...prev, newSprint]);
    setSelectedSprintId(newId);
  };

  const removeSprint = (sprintId: string) => {
    if (sprintsData.length <= 1) return;
    const updated = sprintsData.filter((s) => s.id !== sprintId);
    setSprintsData(updated);
    if (selectedSprintId === sprintId) {
      setSelectedSprintId(updated[0].id);
    }
  };

  const updateSprintName = (name: string) => {
    updateSprint({ ...selectedSprint, name });
  };

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
          <div className="flex items-center gap-2">
            <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sprintsData.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="icon" variant="outline" onClick={addSprint} title="Adicionar Sprint">
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => removeSprint(selectedSprintId)}
              disabled={sprintsData.length <= 1}
              title="Remover Sprint"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sprint name edit */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Nome da Sprint:</span>
          <Input
            value={selectedSprint.name}
            onChange={(e) => updateSprintName(e.target.value)}
            className="max-w-[240px] h-8 text-sm"
          />
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
          <CycleTimeList sprint={selectedSprint} onUpdate={updateSprint} />
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

        {/* Section 3: Story Points Estimado vs Entregue */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Story Points: Estimado vs Entregue
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Comparação entre story points planejados e efetivamente entregues na sprint
          </p>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <StoryPointsChart sprint={selectedSprint} />
          </div>
        </section>

        {/* Section 4: Issue Type Breakdown */}
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
