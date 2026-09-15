import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

function Register({ toggleView }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('https://helpdesk-ticket-system-cwwo.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage("Account created successfully! Please log in.");
        setUsername(''); setEmail(''); setPassword('');
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server connection failed.");
    }
  };

  return (
    <div className="card shadow-sm border-0 border-top border-primary border-3 p-4 w-100" style={{ maxWidth: '400px' }}>
      <div className="d-flex align-items-start gap-3 mb-3">
        <div className="bg-primary-subtle text-primary-emphasis rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
          <UserPlus size={20} />
        </div>
        <div>
          <h3 className="fw-semibold mb-1 fs-4">Create your account</h3>
          <p className="text-secondary small mb-0">Register to file and follow up on support requests.</p>
        </div>
      </div>

      {message && <div className={`alert py-2 small ${isError ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Username</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Email address</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="form-label small fw-semibold text-secondary">Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">Register</button>
      </form>

      <p className="text-center small text-secondary mt-3 mb-0">
        Already have an account? <button className="btn btn-link p-0 fw-semibold text-decoration-none" onClick={toggleView}>Login here</button>
      </p>
    </div>
  );
}

export default Register;