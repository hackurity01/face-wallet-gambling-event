import { HashRouter, Routes, Route } from 'react-router-dom';
import BettingPage from './pages/BettingPage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BettingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
