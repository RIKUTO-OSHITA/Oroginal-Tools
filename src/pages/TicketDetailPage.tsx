import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';
import TicketForm from '../components/TicketForm';
import type { TicketFormValues } from '../components/TicketForm';
import { TICKET_STATUS_LABELS } from '../types/ticket';
import NotFoundPage from './NotFoundPage';

export default function TicketDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { getTicketById, updateTicket, deleteTicket } = useTickets();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const ticket = ticketId ? getTicketById(ticketId) : undefined;

  if (!ticket) {
    return <NotFoundPage />;
  }

  const handleSubmit = (values: TicketFormValues) => {
    updateTicket(ticket.id, {
      title: values.title,
      purpose: values.purpose,
      acceptanceCriteria: values.acceptanceCriteria,
      notes: values.notes,
      status: values.status,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`${ticket.id} を削除しますか？この操作は取り消せません。`)) {
      deleteTicket(ticket.id);
      navigate('/');
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1>{ticket.id}</h1>
        <Link to="/" className="button button--secondary">ボードに戻る</Link>
      </header>

      {isEditing ? (
        <TicketForm
          initialValues={{
            title: ticket.title,
            purpose: ticket.purpose,
            acceptanceCriteria: ticket.acceptanceCriteria,
            notes: ticket.notes,
            status: ticket.status,
          }}
          submitLabel="保存"
          showStatus
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="ticket-detail">
          <dl>
            <dt>チケット名</dt>
            <dd>{ticket.title}</dd>
            <dt>目的</dt>
            <dd>{ticket.purpose || '(未入力)'}</dd>
            <dt>受け入れ条件</dt>
            <dd>{ticket.acceptanceCriteria || '(未入力)'}</dd>
            <dt>補足</dt>
            <dd>{ticket.notes || '(未入力)'}</dd>
            <dt>ステータス</dt>
            <dd>{TICKET_STATUS_LABELS[ticket.status]}</dd>
          </dl>
          <div className="ticket-detail__actions">
            <button type="button" className="button" onClick={() => setIsEditing(true)}>編集</button>
            <button type="button" className="button button--danger" onClick={handleDelete}>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}
