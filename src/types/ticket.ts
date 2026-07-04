export type TicketStatus = 'todo' | 'in_progress' | 'done';

export interface Ticket {
  id: string;
  title: string;
  purpose: string;
  acceptanceCriteria: string;
  notes: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export const TICKET_STATUSES: TicketStatus[] = ['todo', 'in_progress', 'done'];

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};
