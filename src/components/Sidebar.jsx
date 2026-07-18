import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Recycle, 
  Globe, 
  LineChart, 
  MessageSquare, 
  Ship, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  FileText,
  User
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, logout, user } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'marketplace', label: 'Resource Exchange', icon: Recycle },
    { id: 'carbon', label: 'Carbon Ledger', icon: Globe },
    { id: 'financial', label: 'Financial Analytics', icon: LineChart },
    { id: 'copilot', label: 'Sustainability Copilot', icon: MessageSquare },
    { id: 'intelligence', label: 'Market Intelligence', icon: FileText },
    { id: 'logistics', label: 'Logistics Center', icon: Ship },
    { id: 'admin', label: 'Admin Hub', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
        <div className="brand-logo-icon">
          <Recycle size={22} className="text-emerald animate-pulse" />
        </div>
        <span className="brand-name font-display">Circular<span style={{ color: '#10b981' }}>IQ</span></span>
      </div>

      {/* Profile Overview (Mini Glass Card) */}
      <div className="sidebar-profile-card">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h4 className="profile-name">{user.name}</h4>
          <span className="profile-role">{user.role}</span>
          <div className="profile-badge">
            <span className="badge-dot" /> Verified Org
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'marketplace' && activeTab === 'material-detail');
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.id === 'copilot' && (
                <span className="copilot-pill">AI</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="sidebar-footer">
        <button onClick={logout} className="nav-item logout-btn">
          <LogOut size={18} className="nav-icon" />
          <span className="nav-label">Exit Platform</span>
        </button>
      </div>
    </div>
  );
};
