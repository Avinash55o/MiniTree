import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import PublicProfile from './pages/profile';
import AuthPage from './pages/authPage';

function App() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/:username" element={<PublicProfile />} />
        <Route
          path="/"
          element={
            userId ? (
              <Dashboard
                userId={userId}
                onLogout={() => {
                  localStorage.removeItem('userId');
                  setUserId(null);
                }}
              />
            ) : (
              <AuthPage
                onLogin={(id) => {
                  localStorage.setItem('userId', id);
                  setUserId(id);
                }}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
