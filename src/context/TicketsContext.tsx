import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Ticket } from '../types/ticket';
import * as ticketStore from '../store/ticketStore';
import type { CreateTicketInput, UpdateTicketInput } from '../store/ticketStore';

interface TicketsContextValue {
  tickets: Ticket[];
  createTicket: (input: CreateTicketInput) => Ticket;
  updateTicket: (id: string, patch: UpdateTicketInput) => Ticket | undefined;
  deleteTicket: (id: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
}

const TicketsContext = createContext<TicketsContextValue | undefined>(undefined);

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(() => ticketStore.loadTickets());

  const createTicket = (input: CreateTicketInput): Ticket => {
    const ticket = ticketStore.createTicket(input);
    setTickets(ticketStore.loadTickets());
    return ticket;
  };

  const updateTicket = (id: string, patch: UpdateTicketInput): Ticket | undefined => {
    const updated = ticketStore.updateTicket(id, patch);
    setTickets(ticketStore.loadTickets());
    return updated;
  };

  const deleteTicket = (id: string): void => {
    ticketStore.deleteTicket(id);
    setTickets(ticketStore.loadTickets());
  };

  const getTicketById = (id: string): Ticket | undefined => tickets.find((ticket) => ticket.id === id);

  const value: TicketsContextValue = {
    tickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
  };

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>;
}

export function useTickets(): TicketsContextValue {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
}
