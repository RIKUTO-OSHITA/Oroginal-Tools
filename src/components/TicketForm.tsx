import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TicketStatus } from '../types/ticket';
import { TICKET_STATUSES, TICKET_STATUS_LABELS } from '../types/ticket';

export interface TicketFormValues {
  title: string;
  purpose: string;
  acceptanceCriteria: string;
  notes: string;
  status: TicketStatus;
}

interface TicketFormProps {
  initialValues: TicketFormValues;
  submitLabel: string;
  showStatus?: boolean;
  onSubmit: (values: TicketFormValues) => void;
}

export default function TicketForm({ initialValues, submitLabel, showStatus = false, onSubmit }: TicketFormProps) {
  const [values, setValues] = useState<TicketFormValues>(initialValues);
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.title.trim() === '') {
      setTitleError('チケット名は必須です');
      return;
    }
    setTitleError(null);
    onSubmit(values);
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <label className="ticket-form__field">
        <span>チケット名</span>
        <input
          type="text"
          value={values.title}
          onChange={(event) => setValues({ ...values, title: event.target.value })}
        />
        {titleError && <span className="ticket-form__error">{titleError}</span>}
      </label>

      <label className="ticket-form__field">
        <span>目的</span>
        <textarea
          value={values.purpose}
          onChange={(event) => setValues({ ...values, purpose: event.target.value })}
        />
      </label>

      <label className="ticket-form__field">
        <span>受け入れ条件</span>
        <textarea
          value={values.acceptanceCriteria}
          onChange={(event) => setValues({ ...values, acceptanceCriteria: event.target.value })}
        />
      </label>

      <label className="ticket-form__field">
        <span>補足</span>
        <textarea
          value={values.notes}
          onChange={(event) => setValues({ ...values, notes: event.target.value })}
        />
      </label>

      {showStatus && (
        <label className="ticket-form__field">
          <span>ステータス</span>
          <select
            value={values.status}
            onChange={(event) => setValues({ ...values, status: event.target.value as TicketStatus })}
          >
            {TICKET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {TICKET_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>
      )}

      <button type="submit" className="ticket-form__submit">
        {submitLabel}
      </button>
    </form>
  );
}
