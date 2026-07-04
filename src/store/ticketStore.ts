import type { Ticket, TicketStatus } from '../types/ticket';

const TICKETS_KEY = 'agile-tickets:tickets';
const COUNTER_KEY = 'agile-tickets:ticket-counter';

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadTickets(): Ticket[] {
  return readJSON<Ticket[]>(TICKETS_KEY, []);
}

export function saveTickets(tickets: Ticket[]): void {
  writeJSON(TICKETS_KEY, tickets);
}

export function loadCounter(): number {
  return readJSON<number>(COUNTER_KEY, 0);
}

export function saveCounter(counter: number): void {
  writeJSON(COUNTER_KEY, counter);
}

function allocateNextId(): string {
  const next = loadCounter() + 1;
  saveCounter(next);
  return `Tickets-${next}`;
}

export interface CreateTicketInput {
  title: string;
  purpose: string;
  acceptanceCriteria: string;
  notes: string;
}

export interface UpdateTicketInput {
  title?: string;
  purpose?: string;
  acceptanceCriteria?: string;
  notes?: string;
  status?: TicketStatus;
}

export function createTicket(input: CreateTicketInput): Ticket {
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: allocateNextId(),
    title: input.title,
    purpose: input.purpose,
    acceptanceCriteria: input.acceptanceCriteria,
    notes: input.notes,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };

  const tickets = loadTickets();
  tickets.push(ticket);
  saveTickets(tickets);
  return ticket;
}

export function updateTicket(id: string, patch: UpdateTicketInput): Ticket | undefined {
  const tickets = loadTickets();
  const index = tickets.findIndex((ticket) => ticket.id === id);
  if (index === -1) return undefined;

  const updated: Ticket = {
    ...tickets[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  tickets[index] = updated;
  saveTickets(tickets);
  return updated;
}

export function deleteTicket(id: string): void {
  const tickets = loadTickets().filter((ticket) => ticket.id !== id);
  saveTickets(tickets);
}

export function getTicketById(id: string): Ticket | undefined {
  return loadTickets().find((ticket) => ticket.id === id);
}
