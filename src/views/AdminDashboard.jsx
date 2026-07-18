import React, { useState } from 'react';
import { ShieldAlert, Check, X, ShieldCheck, Users, Activity, Heart } from 'lucide-react';

export const AdminDashboard = () => {
  const [queue, setQueue] = useState([
    { id: 'req-01', company: 'Apex Chemicals Ltd.', material: 'Recycled Polypropylene', purity: '94%', volume: '40 Tons', status: 'Pending Chemistry Audit' },
    { id: 'req-02', company: 'Reno Battery Recycling', material: 'Cobalt Sulfate Hydrate', purity: '99.5%', volume: '12 Tons', status: 'Pending Hazmat Certification' }
  ]);

  const handleApprove = (id) => {
    setQueue(prev => prev.filter(req => req.id !== id));
  };

  const handleReject = (id) => {
    setQueue(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="admin-dashboard-view">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-icon-wrapper green">
            <Users size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Registered Organizations</span>
            <h3 className="metric-value font-display">184 Factories</h3>
            <span className="metric-trend positive">+8 new this month</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper blue">
            <Activity size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Exchange Liquidity</span>
            <h3 className="metric-value font-display">$1.2M Spot Value</h3>
            <span className="metric-trend positive">+14% transaction growth</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper yellow">
            <ShieldAlert size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Compliance Alerts Queue</span>
            <h3 className="metric-value font-display">{queue.length} Audits Pending</h3>
            <span className="metric-trend negative">SLA target: &lt; 24h</span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="dashboard-grid">
        {/* Left Side: Compliance queue */}
        <div className="dashboard-left-col">
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Compliance Approvals Backlog</h3>
              <p className="panel-subtitle">Review chemical certifications and legal registrations before marketplace listing publication</p>
            </div>
            <div className="panel-body">
              {queue.length === 0 ? (
                <div className="empty-state-card glass" style={{ minHeight: '140px' }}>
                  <ShieldCheck size={36} className="text-emerald" />
                  <h4>Compliance Backlog Cleared</h4>
                  <p>All active material exchanges have been verified and digitally signed.</p>
                </div>
              ) : (
                <div className="admin-queue-list" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {queue.map(req => (
                    <div key={req.id} className="admin-queue-card glass">
                      <div className="queue-info">
                        <h4>{req.material} ({req.volume})</h4>
                        <span className="queue-company">Origin: {req.company} • Purity: {req.purity}</span>
                        <p className="queue-status">Status: <strong>{req.status}</strong></p>
                      </div>
                      <div className="queue-actions" style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleApprove(req.id)} className="btn-secondary approve-btn" title="Approve & Publish">
                          <Check size={16} /> Approve
                        </button>
                        <button onClick={() => handleReject(req.id)} className="btn-secondary reject-btn" title="Reject Listing">
                          <X size={16} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Security & Audit Ledger Logs */}
        <div className="dashboard-right-col">
          <div className="dashboard-panel glass">
            <h3 className="panel-title font-display">Cryptographic Audit Logs</h3>
            <p className="panel-subtitle">Blockchain-anchored block validation ledger signatures</p>
            
            <div className="compliance-logs-list" style={{ marginTop: '16px' }}>
              <div className="compliance-log-item glass">
                <div>
                  <strong>Block Signature #0099AB</strong>
                  <span>Approved TexChem HDPE Pellets listing</span>
                </div>
                <span className="log-badge pass">Verified</span>
              </div>
              <div className="compliance-log-item glass">
                <div>
                  <strong>Block Signature #0099AA</strong>
                  <span>Verified Valley Agri-Processing D-U-N-S entry</span>
                </div>
                <span className="log-badge pass">Verified</span>
              </div>
              <div className="compliance-log-item glass">
                <div>
                  <strong>Block Signature #0099A9</strong>
                  <span>Compliance signature generated for Midwest Steel GGBFS</span>
                </div>
                <span className="log-badge pass">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
