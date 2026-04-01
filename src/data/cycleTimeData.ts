export type IssueType = "Story" | "Bug" | "Task" | "Improvement";

export interface Story {
  id: string;
  name: string;
  issueType: IssueType;
  epic: string;
  storyPoints: number;
  assignee: string;
  leadTimeDays: number;
  inProgressDays: number;
  codeReviewDays: number;
  done: boolean;
  reworked: boolean;
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
      { id: "s1", name: "Implementar login com OAuth", issueType: "Story", epic: "Autenticação", storyPoints: 8, assignee: "Ana Silva", leadTimeDays: 5, inProgressDays: 3, codeReviewDays: 2, done: true, reworked: false },
      { id: "s2", name: "Criar dashboard de métricas", issueType: "Story", epic: "Analytics", storyPoints: 13, assignee: "Carlos Souza", leadTimeDays: 8, inProgressDays: 5, codeReviewDays: 3, done: true, reworked: true },
      { id: "s3", name: "Refatorar módulo de pagamentos", issueType: "Improvement", epic: "Pagamentos", storyPoints: 5, assignee: "Juliana Costa", leadTimeDays: 3, inProgressDays: 2, codeReviewDays: 1, done: true, reworked: false },
      { id: "s4", name: "Adicionar filtros na listagem", issueType: "Task", epic: "Analytics", storyPoints: 3, assignee: "Pedro Lima", leadTimeDays: 2, inProgressDays: 1, codeReviewDays: 1, done: false, reworked: false },
      { id: "s5", name: "Corrigir bug de notificações", issueType: "Bug", epic: "Notificações", storyPoints: 2, assignee: "Ana Silva", leadTimeDays: 1, inProgressDays: 0.5, codeReviewDays: 0.5, done: true, reworked: true },
      { id: "s6", name: "API de exportação CSV", issueType: "Task", epic: "Analytics", storyPoints: 5, assignee: "Carlos Souza", leadTimeDays: 4, inProgressDays: 3, codeReviewDays: 1, done: true, reworked: false },
    ],
  },
  {
    id: "sprint-13",
    name: "Sprint 13",
    stories: [
      { id: "s7", name: "Tela de configurações do usuário", issueType: "Story", epic: "Perfil", storyPoints: 5, assignee: "Juliana Costa", leadTimeDays: 4, inProgressDays: 2.5, codeReviewDays: 1.5, done: true, reworked: false },
      { id: "s8", name: "Integração com Slack", issueType: "Story", epic: "Notificações", storyPoints: 8, assignee: "Pedro Lima", leadTimeDays: 6, inProgressDays: 4, codeReviewDays: 2, done: true, reworked: true },
      { id: "s9", name: "Otimizar queries do relatório", issueType: "Improvement", epic: "Analytics", storyPoints: 3, assignee: "Ana Silva", leadTimeDays: 2, inProgressDays: 1.5, codeReviewDays: 0.5, done: true, reworked: false },
      { id: "s10", name: "Implementar cache Redis", issueType: "Task", epic: "Infraestrutura", storyPoints: 8, assignee: "Carlos Souza", leadTimeDays: 7, inProgressDays: 5, codeReviewDays: 2, done: false, reworked: false },
      { id: "s11", name: "Ajustar responsividade mobile", issueType: "Bug", epic: "UI/UX", storyPoints: 3, assignee: "Juliana Costa", leadTimeDays: 2, inProgressDays: 1, codeReviewDays: 1, done: true, reworked: false },
    ],
  },
];
