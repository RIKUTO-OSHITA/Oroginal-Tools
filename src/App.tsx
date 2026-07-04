import { HashRouter, Route, Routes } from 'react-router-dom';
import { TicketsProvider } from './context/TicketsContext';
import BoardPage from './pages/BoardPage';
import NewTicketPage from './pages/NewTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';
import CompletedPage from './pages/CompletedPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <TicketsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </TicketsProvider>
  );
}

export default App;
