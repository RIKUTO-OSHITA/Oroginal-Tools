import { useNavigate } from 'react-router-dom';
import type { Ticket } from '../types/ticket';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="ticket-card"
      onClick={() => navigate(`/tickets/${ticket.id}`)}
    >
      <span className="ticket-card__id">{ticket.id}</span>
      <span className="ticket-card__title">{ticket.title}</span>
    </button>
  );
}
