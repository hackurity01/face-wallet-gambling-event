import { HashRouter, Routes, Route } from 'react-router-dom';
import BettingPage from './pages/BettingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BettingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
