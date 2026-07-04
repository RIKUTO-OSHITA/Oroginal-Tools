import { useNavigate, Link } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';
import TicketForm from '../components/TicketForm';
import type { TicketFormValues } from '../components/TicketForm';

const EMPTY_VALUES: TicketFormValues = {
  title: '',
  purpose: '',
  acceptanceCriteria: '',
  notes: '',
  status: 'todo',
};

export default function NewTicketPage() {
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const handleSubmit = (values: TicketFormValues) => {
    createTicket({
      title: values.title,
      purpose: values.purpose,
      acceptanceCriteria: values.acceptanceCriteria,
      notes: values.notes,
    });
    navigate('/');
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1>新規チケット作成</h1>
        <Link to="/" className="button button--secondary">ボードに戻る</Link>
      </header>
      <TicketForm initialValues={EMPTY_VALUES} submitLabel="作成" onSubmit={handleSubmit} />
    </div>
  );
}
