import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Key, Lock, User, FileText, CheckCircle2 } from 'lucide-react';

export const Settings = () => {
  const { user, setUser } = useApp();
  const [apiKey, setApiKey] = useState('ciq_live_499f8a2bc88b901a');
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`ciq_live_${randomHex}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="settings-view">
      <div className="dashboard-grid">
        {/* Left Side: Profile & Organization settings */}
        <div className="dashboard-left-col">
          {/* Org details Card */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Enterprise Organization Profile</h3>
              <p className="panel-subtitle">Edit corporate identifiers, location, and verified cert tags</p>
            </div>
            <div className="panel-body">
              <div className="settings-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label><User size={14} /> Organization Legal Entity</label>
                  <input 
                    type="text" 
                    value={user.company} 
                    onChange={(e) => setUser(prev => ({ ...prev, company: e.target.value }))}
                    className="drawer-input" 
                  />
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Corporate Headquarter</label>
                    <input 
                      type="text" 
                      value={user.location}
                      onChange={(e) => setUser(prev => ({ ...prev, location: e.target.value }))}
                      className="drawer-input" 
                    />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Industry Classification</label>
                    <input 
                      type="text" 
                      value={user.industry} 
                      onChange={(e) => setUser(prev => ({ ...prev, industry: e.target.value }))}
                      className="drawer-input" 
                    />
                  </div>
                </div>

                <div className="settings-certifications-section">
                  <h4 className="font-display" style={{ fontSize: '13px', margin: '8px 0' }}>Active Sustainability Certifications</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {user.certifications.map((cert, idx) => (
                      <span key={idx} className="settings-cert-tag glass">
                        <ShieldCheck size={12} className="text-emerald" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Credentials & Security settings */}
        <div className="dashboard-right-col">
          {/* API Keys Credentials management */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} className="text-emerald" />
                <h3 className="panel-title font-display">API Credentials</h3>
              </div>
            </div>
            <div className="panel-body flex-col-gap">
              <p>Sync waste stream listing logs directly from SAP, Oracle ERP, or Microsoft Dynamics.</p>
              
              <div className="api-key-container glass">
                <span className="api-key-label">Live API Access Token</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <input 
                    type="text" 
                    value={apiKey} 
                    readOnly 
                    className="drawer-input font-mono" 
                    style={{ flex: 1, fontSize: '11px', background: 'rgba(0,0,0,0.1)' }}
                  />
                  <button onClick={handleCopy} className="btn-secondary" style={{ fontSize: '11px' }}>
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <button onClick={handleGenerateKey} className="btn-primary w-full">
                Roll Secret Token
              </button>
            </div>
          </div>

          {/* Compliance Audit Document Uploads */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} className="text-emerald" />
                <h3 className="panel-title font-display">Audit Archives</h3>
              </div>
            </div>
            <div className="panel-body">
              <p>Upload fresh laboratory purity certificate files or carbon credit compliance registries.</p>
              <div className="upload-dropzone glass">
                <FileText size={24} className="text-secondary animate-pulse" />
                <span>Drag certification documents here</span>
                <span className="upload-sub">Supports PDF, CSV, XML (max 10MB)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
