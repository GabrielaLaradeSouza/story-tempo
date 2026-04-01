import { useState } from "react";
import { Sprint, Story, IssueType } from "@/data/cycleTimeData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Bug, CheckSquare, Sparkles, Plus, Trash2, Pencil, Check, X, CheckCircle2, Circle, RotateCcw, TrendingUp, Hash, AlertTriangle } from "lucide-react";

interface CycleTimeListProps {
  sprint: Sprint;
  onUpdate: (sprint: Sprint) => void;
}

const getLeadTimeColor = (days: number) => {
  if (days <= 2) return "bg-emerald-100 text-emerald-800";
  if (days <= 5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

const issueTypeConfig: Record<IssueType, { icon: typeof BookOpen; label: string; className: string }> = {
  Story: { icon: BookOpen, label: "Story", className: "bg-blue-100 text-blue-800" },
  Bug: { icon: Bug, label: "Bug", className: "bg-red-100 text-red-800" },
  Task: { icon: CheckSquare, label: "Task", className: "bg-purple-100 text-purple-800" },
  Improvement: { icon: Sparkles, label: "Improvement", className: "bg-teal-100 text-teal-800" },
};

const ISSUE_TYPES: IssueType[] = ["Story", "Bug", "Task", "Improvement"];

const createEmptyStory = (): Story => ({
  id: `s-${Date.now()}`,
  name: "",
  issueType: "Story",
  epic: "",
  storyPoints: 0,
  assignee: "",
  leadTimeDays: 0,
  inProgressDays: 0,
  codeReviewDays: 0,
  done: false,
  reworked: false,
});

const CycleTimeList = ({ sprint, onUpdate }: CycleTimeListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Story | null>(null);

  const totalSP = sprint.stories.reduce((sum, s) => sum + s.storyPoints, 0);
  const doneStories = sprint.stories.filter((s) => s.done);
  const deliveredSP = doneStories.reduce((sum, s) => sum + s.storyPoints, 0);
  const deliveredCount = doneStories.length;
  const avgLeadTime =
    sprint.stories.length > 0
      ? sprint.stories.reduce((sum, s) => sum + s.leadTimeDays, 0) / sprint.stories.length
      : 0;
  const reworkedCount = sprint.stories.filter((s) => s.reworked).length;
  const reworkPercent =
    sprint.stories.length > 0
      ? Math.round((reworkedCount / sprint.stories.length) * 100)
      : 0;

  const startEdit = (story: Story) => {
    setEditingId(story.id);
    setEditData({ ...story });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (!editData) return;
    onUpdate({
      ...sprint,
      stories: sprint.stories.map((s) => (s.id === editData.id ? editData : s)),
    });
    setEditingId(null);
    setEditData(null);
  };

  const addStory = () => {
    const newStory = createEmptyStory();
    onUpdate({ ...sprint, stories: [...sprint.stories, newStory] });
    startEdit(newStory);
  };

  const removeStory = (storyId: string) => {
    onUpdate({
      ...sprint,
      stories: sprint.stories.filter((s) => s.id !== storyId),
    });
    if (editingId === storyId) cancelEdit();
  };

  const updateEditField = (field: keyof Story, value: string | number | boolean) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const toggleDone = (storyId: string) => {
    onUpdate({
      ...sprint,
      stories: sprint.stories.map((s) =>
        s.id === storyId ? { ...s, done: !s.done } : s
      ),
    });
  };

  const toggleReworked = (storyId: string) => {
    onUpdate({
      ...sprint,
      stories: sprint.stories.map((s) =>
        s.id === storyId ? { ...s, reworked: !s.reworked } : s
      ),
    });
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col items-center justify-center gap-1">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">{avgLeadTime.toFixed(1)}d</span>
          <span className="text-xs text-muted-foreground font-medium">Média Lead Time</span>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col items-center justify-center gap-1">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">{deliveredSP} <span className="text-sm font-normal text-muted-foreground">/ {totalSP}</span></span>
          <span className="text-xs text-muted-foreground font-medium">SP Entregues</span>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col items-center justify-center gap-1">
          <Hash className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">{deliveredCount} <span className="text-sm font-normal text-muted-foreground">/ {sprint.stories.length}</span></span>
          <span className="text-xs text-muted-foreground font-medium">Stories Entregues</span>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col items-center justify-center gap-1">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span className="text-2xl font-bold text-foreground">{reworkPercent}%</span>
          <span className="text-xs text-muted-foreground font-medium">Retrabalho</span>
          <span className="text-[10px] text-muted-foreground">{reworkedCount} de {sprint.stories.length}</span>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button size="sm" variant="outline" onClick={addStory} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Adicionar Story
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Story</TableHead>
              <TableHead className="font-semibold">Tipo</TableHead>
              <TableHead className="font-semibold">Épico</TableHead>
              <TableHead className="font-semibold text-center">SP</TableHead>
              <TableHead className="font-semibold">Responsável</TableHead>
              <TableHead className="font-semibold text-center">In Progress</TableHead>
              <TableHead className="font-semibold text-center">Code Review</TableHead>
              <TableHead className="font-semibold text-center">Lead Time</TableHead>
              <TableHead className="font-semibold text-center">Done</TableHead>
              <TableHead className="font-semibold text-center">Retrabalho</TableHead>
              <TableHead className="font-semibold text-center w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sprint.stories.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                  Nenhuma story adicionada. Clique em "Adicionar Story" para começar.
                </TableCell>
              </TableRow>
            )}
            {sprint.stories.map((story) => {
              const isEditing = editingId === story.id;
              const data = isEditing && editData ? editData : story;
              const typeConfig = issueTypeConfig[data.issueType];
              const TypeIcon = typeConfig.icon;

              if (isEditing && editData) {
                return (
                  <TableRow key={story.id} className="bg-primary/5">
                    <TableCell>
                      <Input
                        value={editData.name}
                        onChange={(e) => updateEditField("name", e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Nome da story"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editData.issueType}
                        onValueChange={(v) => updateEditField("issueType", v)}
                      >
                        <SelectTrigger className="h-8 text-xs w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ISSUE_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editData.epic}
                        onChange={(e) => updateEditField("epic", e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Épico"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editData.storyPoints}
                        onChange={(e) => updateEditField("storyPoints", Number(e.target.value))}
                        className="h-8 text-sm text-center w-16"
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editData.assignee}
                        onChange={(e) => updateEditField("assignee", e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Responsável"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editData.inProgressDays}
                        onChange={(e) => updateEditField("inProgressDays", Number(e.target.value))}
                        className="h-8 text-sm text-center w-20"
                        min={0}
                        step={0.5}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editData.codeReviewDays}
                        onChange={(e) => updateEditField("codeReviewDays", Number(e.target.value))}
                        className="h-8 text-sm text-center w-20"
                        min={0}
                        step={0.5}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editData.leadTimeDays}
                        onChange={(e) => updateEditField("leadTimeDays", Number(e.target.value))}
                        className="h-8 text-sm text-center w-20"
                        min={0}
                        step={0.5}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateEditField("done", !editData.done)}
                        className="h-7 w-7"
                      >
                        {editData.done ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateEditField("reworked", !editData.reworked)}
                        className="h-7 w-7"
                      >
                        {editData.reworked ? (
                          <RotateCcw className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button size="icon" variant="ghost" onClick={saveEdit} className="h-7 w-7 text-emerald-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={cancelEdit} className="h-7 w-7 text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={story.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium max-w-[260px] truncate">
                    {story.name || <span className="text-muted-foreground italic">Sem nome</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeConfig.className}`}>
                      <TypeIcon className="h-3 w-3" />
                      {typeConfig.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {story.epic || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {story.storyPoints}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {story.assignee || "-"}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {story.inProgressDays}d
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {story.codeReviewDays}d
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLeadTimeColor(story.leadTimeDays)}`}>
                      {story.leadTimeDays}d
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleDone(story.id)}
                      className="h-7 w-7"
                    >
                      {story.done ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleReworked(story.id)}
                      className="h-7 w-7"
                    >
                      {story.reworked ? (
                        <RotateCcw className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(story)} className="h-7 w-7">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => removeStory(story.id)} className="h-7 w-7 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CycleTimeList;
