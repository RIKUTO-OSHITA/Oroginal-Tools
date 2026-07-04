import { Link } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';
import TicketCard from '../components/TicketCard';

export default function CompletedPage() {
  const { tickets } = useTickets();
  const completedTickets = tickets.filter((ticket) => ticket.status === 'done');

  return (
    <div className="page">
      <header className="page__header">
        <h1>完了チケット一覧</h1>
        <Link to="/" className="button button--secondary">ボードに戻る</Link>
      </header>

      <div className="board__cards">
        {completedTickets.length === 0 ? (
          <p>完了したチケットはまだありません。</p>
        ) : (
          completedTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        )}
      </div>
    </div>
  );
}
