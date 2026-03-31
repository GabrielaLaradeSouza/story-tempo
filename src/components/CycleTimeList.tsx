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
import { Clock, BookOpen, Bug, CheckSquare, Sparkles, Plus, Trash2, Pencil, Check, X, CheckCircle2, Circle } from "lucide-react";

interface CycleTimeListProps {
  sprint: Sprint;
  onUpdate: (sprint: Sprint) => void;
}

const getCycleTimeColor = (days: number) => {
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
  cycleTimeDays: 0,
  inProgressDays: 0,
  codeReviewDays: 0,
  done: false,
});

const CycleTimeList = ({ sprint, onUpdate }: CycleTimeListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Story | null>(null);

  const avgCycleTime =
    sprint.stories.length > 0
      ? sprint.stories.reduce((sum, s) => sum + s.cycleTimeDays, 0) / sprint.stories.length
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
    // Auto-calculate cycle time from in progress + code review
    const updated = {
      ...editData,
      cycleTimeDays: editData.inProgressDays + editData.codeReviewDays,
    };
    onUpdate({
      ...sprint,
      stories: sprint.stories.map((s) => (s.id === updated.id ? updated : s)),
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

  const updateEditField = (field: keyof Story, value: string | number) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Média: {avgCycleTime.toFixed(1)} dias
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {sprint.stories.length} stories concluídas
          </span>
        </div>
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
              <TableHead className="font-semibold text-center">Cycle Time</TableHead>
              <TableHead className="font-semibold text-center w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sprint.stories.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
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
                    <TableCell className="text-center text-sm font-semibold text-muted-foreground">
                      {(editData.inProgressDays + editData.codeReviewDays).toFixed(1)}d
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
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCycleTimeColor(story.cycleTimeDays)}`}>
                      {story.cycleTimeDays}d
                    </span>
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
