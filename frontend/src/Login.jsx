import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, User } from 'lucide-react';

function Login({ onLoginSuccess, toggleView }) {
  const [activeTab, setActiveTab] = useState('client'); // 'client' or 'developer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost/dashboard/ticket-system/backend-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: activeTab })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message || "Authentication breakdown.");
      }
    } catch (err) {
      setError("Server connection timed out.");
    }
  };

  return (
    <div className="container-fluid px-3 d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
      <div className="card w-100 shadow border-0 overflow-hidden" style={{ maxWidth: '440px', borderRadius: '16px' }}>
        
        {/* Responsive Separated UI Tab Selectors */}
        <div className="d-flex bg-light text-center border-bottom">
          <button 
            className={`flex-grow-1 py-3 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${activeTab === 'client' ? 'bg-white text-primary border-bottom border-3 border-primary' : 'text-muted bg-light'}`}
            onClick={() => { setActiveTab('client'); setError(''); }}
          >
            <User size={18} /> Client Portal
          </button>
          <button 
            className={`flex-grow-1 py-3 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${activeTab === 'developer' ? 'bg-white text-danger border-bottom border-3 border-danger' : 'text-muted bg-light'}`}
            onClick={() => { setActiveTab('developer'); setError(''); }}
          >
            <ShieldAlert size={18} /> Admin Terminal
          </button>
        </div>

        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3 className={`fw-black ${activeTab === 'developer' ? 'text-danger' : 'text-primary'}`}>
              {activeTab === 'developer' ? 'Admin Access Console' : 'Support Login'}
            </h3>
            <p className="text-muted small">Enter credentials to safely establish a secure session connection.</p>
          </div>

          {error && <div className="alert alert-danger border-0 shadow-sm py-2 px-3 small">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Email Address</label>
              <input 
                type="email" 
                className="form-control rounded-3" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder={activeTab === 'developer' ? 'dev@company.com' : 'name@example.com'}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">Password Verification Key</label>
              <div className="input-group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control rounded-start-3" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required 
                />
                {/* React Lucide Dynamic View/Hide Button Element Trigger */}
                <button 
                  type="button" 
                  className="btn btn-outline-secondary rounded-end-3 d-flex align-items-center px-3" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn w-100 py-2.5 rounded-3 fw-bold text-white shadow-sm border-0 ${activeTab === 'developer' ? 'bg-danger btn-danger' : 'bg-primary btn-primary'}`}
            >
              Authorize Credentials
            </button>
          </form>

          {activeTab === 'client' && (
            <p className="text-center mt-4 mb-0 small text-muted">
              New user account client context? <button className="btn btn-link p-0 text-decoration-none fw-bold small" onClick={toggleView}>Register here</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
