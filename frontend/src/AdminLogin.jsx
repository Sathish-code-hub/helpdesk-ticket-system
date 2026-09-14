import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, ArrowLeftRight, Ticket } from 'lucide-react';

function AdminLogin({ onLoginSuccess, changeView }) {
  const [email, setEmail] = useState('dev@company.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://freepage.cc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'developer' })
      });
      const data = await res.json();
      if (res.ok && data.success) onLoginSuccess(data.user);
      else setError(data.message);
    } catch (err) {
      setError("Server connection dropped.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 vh-100">
        <div className="col-lg-5 bg-dark text-white d-flex flex-column justify-content-center p-5">
          <Ticket size={32} className="text-danger mb-4" />
          <h1 className="display-6 fw-semibold mb-3">Console access</h1>
          <p className="text-white-50 mb-0" style={{ maxWidth: '32ch' }}>
            Sign in to review incoming requests, update their status, and leave notes back to the client.
          </p>
        </div>

        <div className="col-lg-7 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: '380px' }}>
            <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2">
              <ShieldAlert size={15} /> Staff sign-in
            </span>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Work email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="dev@company.com" />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary">Password</label>
                <div className="input-group">
                  <input type={showPassword ? 'text' : 'password'} className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100 fw-semibold py-2">Sign in</button>
            </form>

            <button
              className="btn btn-link text-secondary text-decoration-none w-100 mt-4 pt-3 border-top d-flex align-items-center justify-content-center gap-2"
              onClick={() => changeView('client-login')}
            >
              <ArrowLeftRight size={14} /> Switch to client portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;