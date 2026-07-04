import { Link } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';
import TicketCard from '../components/TicketCard';
import { TICKET_STATUS_LABELS } from '../types/ticket';
import type { TicketStatus } from '../types/ticket';

const BOARD_STATUSES: TicketStatus[] = ['todo', 'in_progress'];

export default function BoardPage() {
  const { tickets } = useTickets();

  return (
    <div className="page">
      <header className="page__header">
        <h1>チケットボード</h1>
        <nav className="page__nav">
          <Link to="/tickets/new" className="button">新規チケット</Link>
          <Link to="/completed" className="button button--secondary">完了チケット一覧</Link>
        </nav>
      </header>

      <div className="board">
        {BOARD_STATUSES.map((status) => (
          <section key={status} className="board__column">
            <h2>{TICKET_STATUS_LABELS[status]}</h2>
            <div className="board__cards">
              {tickets
                .filter((ticket) => ticket.status === status)
                .map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
