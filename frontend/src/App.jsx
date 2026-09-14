import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ClientLogin from './ClientLogin';
import AdminLogin from './AdminLogin';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('client-login'); // 'client-login', 'admin-login', 'register', 'dashboard'

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('client-login');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column bg-light m-0 p-0">
      <Toaster position="top-right" reverseOrder={false} />
      
      {view === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} />}
      {view === 'client-login' && <ClientLogin onLoginSuccess={handleLoginSuccess} changeView={setView} />}
      {view === 'admin-login' && <AdminLogin onLoginSuccess={handleLoginSuccess} changeView={setView} />}
      {view === 'register' && <Register toggleView={() => setView('client-login')} />}
    </div>
  );
}

export default App;
