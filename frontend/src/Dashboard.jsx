import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {Ticket, LogOut, Inbox, ClipboardList, Loader2,} from 'lucide-react';

function Dashboard({ user, onLogout }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for admin dashboard updates
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [devStatus, setDevStatus] = useState('Open');
  const [devNotes, setDevNotes] = useState('');

  const isDev = user.role === 'developer';
  const accent = isDev ? 'danger' : 'primary';

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://freepage.cc{user.id}&role=${user.role}`);
      const data = await res.json();
      if (Array.isArray(data)) setTickets(data);
    } catch (err) {
      toast.error("Failed to load records from database.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Logging ticket into master queue...");

    try {
      const res = await fetch('http://freepage.cc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, title, description })
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { id: loadId });
        setTitle('');
        setDescription('');
        fetchTickets();
      } else {
        toast.error(data.message, { id: loadId });
      }
    } catch (err) {
      toast.error("Network interface connection failure.", { id: loadId });
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Saving status configuration updates...");

    try {
      const res = await fetch('https://helpdesk-ticket-system-cwwo.onrender.com', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id: selectedTicket.id, status: devStatus, developer_notes: devNotes })
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { id: loadId });
        setSelectedTicket(null);
        fetchTickets();
      } else {
        toast.error(data.message, { id: loadId });
      }
    } catch (err) {
      toast.error("Data update delivery dropped.", { id: loadId });
    }
  };

  const statusBadge = (status) => {
    if (status === 'Open') return 'bg-warning-subtle text-warning-emphasis';
    if (status === 'In Progress') return 'bg-info-subtle text-info-emphasis';
    return 'bg-success-subtle text-success-emphasis';
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark px-4 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <Ticket size={22} className={`text-${accent}`} />
          <span className="navbar-brand mb-0 fw-semibold">Service Desk</span>
          <span className={`badge bg-${accent}-subtle text-${accent}-emphasis rounded-pill ms-2 text-capitalize`}>
            {user.role} view
          </span>
        </div>
        <div className="d-flex align-items-center gap-3 text-white">
          <span className="d-none d-sm-inline small text-white-50">Signed in as</span>
          <strong>{user.username}</strong>
          <button className="btn btn-outline-light btn-sm d-flex align-items-center gap-1" onClick={onLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div className="container-fluid my-5 px-4 px-lg-5">
        <div className="row g-4">

          {/* CONTROL RENDER COLUMN SWITCH: Client Input Form or Developer Review Panel */}
          <div className="col-lg-4">
            {!isDev ? (
              <div className="card shadow-sm border-0 border-top border-primary border-3 p-4">
                <h5 className="fw-semibold mb-3">File a technical request</h5>
                <form onSubmit={handleCreateTicket}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Problem heading</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Detailed issue description</label>
                    <textarea className="form-control" rows="5" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">Open ticket</button>
                </form>
              </div>
            ) : selectedTicket ? (
              <div className="card shadow-sm border-0 bg-dark text-white p-4">
                <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill mb-3 align-self-start">
                  Ticket #{selectedTicket.id}
                </span>
                <p className="small mb-1 text-white-50">Client</p>
                <p className="mb-3">{selectedTicket.client_name}</p>
                <p className="small mb-1 text-white-50">Issue</p>
                <p className="mb-4">{selectedTicket.title}</p>

                <form onSubmit={handleUpdateTicket}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-white-50">Set lifecycle status</label>
                    <select className="form-select" value={devStatus} onChange={e => setDevStatus(e.target.value)}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-white-50">Notes for the client</label>
                    <textarea className="form-control" rows="4" value={devNotes} onChange={e => setDevNotes(e.target.value)} placeholder="Type notes for the client..."></textarea>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1 fw-semibold">Save changes</button>
                    <button type="button" className="btn btn-outline-light" onClick={() => setSelectedTicket(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card shadow-sm border-0 text-center p-5">
                <ClipboardList size={28} className="text-secondary mx-auto mb-3" />
                <h6 className="fw-semibold">Queue management</h6>
                <p className="small text-secondary mb-0">
                  Select a ticket from the table to review it, update its status, or leave a note for the client.
                </p>
              </div>
            )}
          </div>

          {/* MASTER GRID VIEW WITH SYNC LOADER COMPONENT ICON */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold mb-0">{isDev ? "Active tickets queue" : "Your open tickets"}</h5>
                {loading && <Loader2 size={18} className={`text-${accent} spin`} />}
              </div>

              {tickets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="text-secondary small">
                        <th>ID</th>
                        {isDev && <th>Client</th>}
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Developer notes</th>
                        {isDev && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(t => (
                        <tr key={t.id}>
                          <td className="text-secondary">#{t.id}</td>
                          {isDev && <td className="fw-semibold">{t.client_name}</td>}
                          <td className="fw-semibold">{t.title}</td>
                          <td className="text-secondary small text-truncate" style={{ maxWidth: '180px' }}>{t.description}</td>
                          <td>
                            <span className={`badge rounded-pill ${statusBadge(t.status)}`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="small fst-italic text-secondary" style={{ maxWidth: '150px' }}>
                            {t.developer_notes || "No notes added yet."}
                          </td>
                          {isDev && (
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm fw-semibold"
                                onClick={() => {
                                  setSelectedTicket(t);
                                  setDevStatus(t.status);
                                  setDevNotes(t.developer_notes || '');
                                }}
                              >
                                Process
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <Inbox size={28} className="text-secondary mb-3" />
                  <p className="text-secondary mb-0">No tickets in the queue yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .spin { animation: tk-spin 0.8s linear infinite; }
        @keyframes tk-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Dashboard;