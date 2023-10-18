import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BettingPage from './pages/BettingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter basename="/face-wallet-gambling-event">
      <Routes>
        <Route path="/" element={<BettingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
