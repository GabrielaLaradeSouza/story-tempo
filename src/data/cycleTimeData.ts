export type IssueType = "Story" | "Bug" | "Task" | "Improvement";

export interface Story {
  id: string;
  name: string;
  issueType: IssueType;
  epic: string;
  storyPoints: number;
  assignee: string;
  cycleTimeDays: number;
  inProgressDays: number;
  codeReviewDays: number;
}

export interface Sprint {
  id: string;
  name: string;
  stories: Story[];
}

export const sprints: Sprint[] = [
  {
    id: "sprint-12",
    name: "Sprint 12",
    stories: [
      { id: "s1", name: "Implementar login com OAuth", epic: "Autenticação", storyPoints: 8, assignee: "Ana Silva", cycleTimeDays: 5, inProgressDays: 3, codeReviewDays: 2 },
      { id: "s2", name: "Criar dashboard de métricas", epic: "Analytics", storyPoints: 13, assignee: "Carlos Souza", cycleTimeDays: 8, inProgressDays: 5, codeReviewDays: 3 },
      { id: "s3", name: "Refatorar módulo de pagamentos", epic: "Pagamentos", storyPoints: 5, assignee: "Juliana Costa", cycleTimeDays: 3, inProgressDays: 2, codeReviewDays: 1 },
      { id: "s4", name: "Adicionar filtros na listagem", epic: "Analytics", storyPoints: 3, assignee: "Pedro Lima", cycleTimeDays: 2, inProgressDays: 1, codeReviewDays: 1 },
      { id: "s5", name: "Corrigir bug de notificações", epic: "Notificações", storyPoints: 2, assignee: "Ana Silva", cycleTimeDays: 1, inProgressDays: 0.5, codeReviewDays: 0.5 },
      { id: "s6", name: "API de exportação CSV", epic: "Analytics", storyPoints: 5, assignee: "Carlos Souza", cycleTimeDays: 4, inProgressDays: 3, codeReviewDays: 1 },
    ],
  },
  {
    id: "sprint-13",
    name: "Sprint 13",
    stories: [
      { id: "s7", name: "Tela de configurações do usuário", epic: "Perfil", storyPoints: 5, assignee: "Juliana Costa", cycleTimeDays: 4, inProgressDays: 2.5, codeReviewDays: 1.5 },
      { id: "s8", name: "Integração com Slack", epic: "Notificações", storyPoints: 8, assignee: "Pedro Lima", cycleTimeDays: 6, inProgressDays: 4, codeReviewDays: 2 },
      { id: "s9", name: "Otimizar queries do relatório", epic: "Analytics", storyPoints: 3, assignee: "Ana Silva", cycleTimeDays: 2, inProgressDays: 1.5, codeReviewDays: 0.5 },
      { id: "s10", name: "Implementar cache Redis", epic: "Infraestrutura", storyPoints: 8, assignee: "Carlos Souza", cycleTimeDays: 7, inProgressDays: 5, codeReviewDays: 2 },
      { id: "s11", name: "Ajustar responsividade mobile", epic: "UI/UX", storyPoints: 3, assignee: "Juliana Costa", cycleTimeDays: 2, inProgressDays: 1, codeReviewDays: 1 },
    ],
  },
];
