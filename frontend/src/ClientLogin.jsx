import React, { useState } from 'react';
import { Eye, EyeOff, LifeBuoy, ShieldAlert, Ticket } from 'lucide-react';

function ClientLogin({ onLoginSuccess, changeView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'client' })
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
        <div className="col-lg-7 order-lg-1 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: '380px' }}>
            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2">
              <LifeBuoy size={15} /> Client sign-in
            </span>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Email address</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
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
              <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">Sign in</button>
            </form>

            <p className="text-center small text-secondary mt-4 mb-2">
              New customer? <button className="btn btn-link p-0 fw-semibold text-decoration-none" onClick={() => changeView('register')}>Create an account</button>
            </p>
            <button
              className="btn btn-link text-secondary text-decoration-none w-100 mt-2 pt-3 border-top d-flex align-items-center justify-content-center gap-2"
              onClick={() => changeView('admin-login')}
            >
              <ShieldAlert size={14} /> Switch to admin console
            </button>
          </div>
        </div>

        <div className="col-lg-5 order-lg-2 bg-primary text-white d-flex flex-column justify-content-center p-5">
          <Ticket size={32} className="mb-4" />
          <h1 className="display-6 fw-semibold mb-3">Client support portal</h1>
          <p className="text-white-50 mb-0" style={{ maxWidth: '32ch' }}>
            Sign in to file a new request or check where your open issues stand.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;