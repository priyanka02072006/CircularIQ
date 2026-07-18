import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Recycle, Key, Lock, Mail, Building2, CheckCircle2 } from 'lucide-react';

export const Auth = () => {
  const { login } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('s.jenkins@ecoflow.com');
  const [password, setPassword] = useState('••••••••••••');
  
  // Signup State
  const [companyName, setCompanyName] = useState('EcoFlow Technologies');
  const [dunsNumber, setDunsNumber] = useState('11-234-5678');
  const [dunsVerified, setDunsVerified] = useState(false);
  const [verifyingDuns, setVerifyingDuns] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleVerifyDuns = () => {
    if (!companyName.trim()) return;
    setVerifyingDuns(true);
    setTimeout(() => {
      setDunsVerified(true);
      setVerifyingDuns(false);
    }, 1800);
  };

  return (
    <div className="auth-page">
      {/* Visual Left Panel */}
      <div className="auth-left-panel">
        <div className="auth-mesh-grid" />
        <div className="auth-left-content">
          <div className="auth-logo font-display">
            <Recycle size={30} className="text-emerald animate-pulse" />
            <span>Circular<span style={{ color: '#10b981' }}>IQ</span></span>
          </div>

          <div className="auth-hero-text">
            <h2 className="font-display">Institutional Resource Exchange</h2>
            <p>
              Join the network of top chemical manufacturers, steel mills, and battery recyclers coordinating zero-carbon secondary material loops.
            </p>
          </div>

          {/* Mini Security card */}
          <div className="auth-info-card glass">
            <ShieldCheck size={20} className="text-emerald" />
            <div className="auth-info-card-text">
              <h4>ISO 27001 & SEC Audited</h4>
              <p>All resource trades are logged and verified using cryptographic validation tags.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form Panel */}
      <div className="auth-right-panel">
        <div className="auth-card glass">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLoginTab ? 'active' : ''}`}
              onClick={() => setIsLoginTab(true)}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${!isLoginTab ? 'active' : ''}`}
              onClick={() => setIsLoginTab(false)}
            >
              Enterprise Register
            </button>
          </div>

          {isLoginTab ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-header">
                <h3 className="font-display">Welcome Back</h3>
                <p>Log in with your enterprise credentials.</p>
              </div>

              <div className="input-group">
                <label><Mail size={14} /> Corporate Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="input-group">
                <label><Lock size={14} /> Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Verify Credentials & Enter
              </button>

              <div className="form-footer">
                <a href="#">Forgot password?</a>
                <span>•</span>
                <a href="#">Contact compliance office</a>
              </div>
            </form>
          ) : (
            /* Register Form */
            <div className="auth-form">
              <div className="form-header">
                <h3 className="font-display">Corporate Enrollment</h3>
                <p>Register your company on the CircularIQ network.</p>
              </div>

              <div className="input-group">
                <label><Building2 size={14} /> Company Legal Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setDunsVerified(false);
                  }}
                  placeholder="e.g. EcoFlow Technologies Inc."
                />
              </div>

              <div className="input-group">
                <label><Key size={14} /> D-U-N-S Registry Number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={dunsNumber}
                    onChange={(e) => {
                      setDunsNumber(e.target.value);
                      setDunsVerified(false);
                    }}
                    placeholder="9-digit D-U-N-S identifier"
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button" 
                    onClick={handleVerifyDuns} 
                    className="btn-secondary"
                    disabled={verifyingDuns || dunsVerified}
                    style={{ fontSize: '11px', whiteSpace: 'nowrap' }}
                  >
                    {verifyingDuns ? 'Checking...' : dunsVerified ? 'Verified' : 'Lookup'}
                  </button>
                </div>
              </div>

              {/* Verified Feedback widget */}
              {dunsVerified && (
                <div className="duns-verified-widget glass">
                  <CheckCircle2 size={18} className="text-emerald animate-bounce" />
                  <div>
                    <h4>D-U-N-S Verified Match</h4>
                    <p>Compliance status: <strong>SEC Compliant Grade A</strong></p>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label><Mail size={14} /> Administrator Email</label>
                <input type="email" placeholder="admin@yourcompany.com" />
              </div>

              <button 
                onClick={() => login(email, password)}
                className="btn-primary w-full"
                disabled={!dunsVerified}
                style={{ opacity: dunsVerified ? 1 : 0.6 }}
              >
                Register & Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
