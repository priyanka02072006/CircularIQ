import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Sun, Moon, Recycle, ShieldCheck, MessageSquare } from 'lucide-react';

export const Header = () => {
  const { 
    theme, 
    toggleTheme, 
    notifications, 
    markNotificationAsRead, 
    activeTab, 
    setActiveTab,
    user 
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Operational Control Center';
      case 'marketplace': return 'Industrial Exchange';
      case 'material-detail': return 'Material Circular Analytics';
      case 'carbon': return 'ESG Carbon Ledger';
      case 'financial': return 'Circular ROI Analytics';
      case 'copilot': return 'AI Sustainability Copilot';
      case 'intelligence': return 'Market Commodity Intelligence';
      case 'logistics': return 'Logistics Optimization Hub';
      case 'admin': return 'Global Administration Panel';
      case 'settings': return 'Enterprise Profile & Integrations';
      default: return 'CircularIQ';
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h2 className="header-title font-display">{getTitle()}</h2>
        <p className="header-subtitle">
          Company: <span style={{ color: 'var(--text-primary)', fontWeight: 'semibold' }}>{user.company}</span>
        </p>
      </div>

      <div className="header-right">
        {/* Circularity Score Pill */}
        <div className="esg-score-pill" onClick={() => setActiveTab('carbon')} style={{ cursor: 'pointer' }}>
          <ShieldCheck size={16} className="text-emerald" />
          <span>Circularity:</span>
          <span className="pill-val">{user.esgScore}%</span>
        </div>

        {/* Global Chat Shortcut */}
        <button 
          onClick={() => setActiveTab('copilot')} 
          className="header-action-btn" 
          title="Sustainability Copilot"
          style={{ position: 'relative' }}
        >
          <MessageSquare size={20} />
          <span className="ai-active-pulse" />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="header-action-btn" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifMenu(!showNotifMenu)} 
            className="header-action-btn"
            title="System alerts"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifMenu && (
            <div className="notification-dropdown glass">
              <div className="notif-dropdown-header">
                <h3>Notifications</h3>
                <span className="notif-unread-count">{unreadCount} unread</span>
              </div>
              <div className="notif-dropdown-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">No active notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`notif-dropdown-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.type === 'chat') {
                          setActiveTab('copilot');
                        }
                        setShowNotifMenu(false);
                      }}
                    >
                      <div className="notif-item-header">
                        <h4>{notif.title}</h4>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                      <p className="notif-message">{notif.message}</p>
                      {!notif.read && (
                        <span className="notif-unread-dot" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
