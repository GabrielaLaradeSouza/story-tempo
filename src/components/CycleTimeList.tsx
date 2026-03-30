import { Sprint, IssueType } from "@/data/cycleTimeData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Bug, CheckSquare, Sparkles } from "lucide-react";

interface CycleTimeListProps {
  sprint: Sprint;
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

const CycleTimeList = ({ sprint }: CycleTimeListProps) => {
  const avgCycleTime =
    sprint.stories.reduce((sum, s) => sum + s.cycleTimeDays, 0) /
    sprint.stories.length;

  return (
    <div className="space-y-4">
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

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Story</TableHead>
              <TableHead className="font-semibold">Tipo</TableHead>
              <TableHead className="font-semibold">Épico</TableHead>
              <TableHead className="font-semibold text-center">SP</TableHead>
              <TableHead className="font-semibold">Responsável</TableHead>
              <TableHead className="font-semibold text-center">Cycle Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sprint.stories.map((story) => {
              const typeConfig = issueTypeConfig[story.issueType];
              const TypeIcon = typeConfig.icon;
              return (
              <TableRow key={story.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium max-w-[260px] truncate">
                  {story.name}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeConfig.className}`}>
                    <TypeIcon className="h-3 w-3" />
                    {typeConfig.label}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {story.epic}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {story.storyPoints}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {story.assignee}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCycleTimeColor(story.cycleTimeDays)}`}
                  >
                    {story.cycleTimeDays}d
                  </span>
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
