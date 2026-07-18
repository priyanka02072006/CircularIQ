import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Import Views
import { LandingPage } from './views/LandingPage';
import { Auth } from './views/Auth';
import { DashboardOverview } from './views/DashboardOverview';
import { Marketplace } from './views/Marketplace';
import { MaterialDetail } from './views/MaterialDetail';
import { CarbonDashboard } from './views/CarbonDashboard';
import { FinancialDashboard } from './views/FinancialDashboard';
import { Copilot } from './views/Copilot';
import { MarketIntelligence } from './views/MarketIntelligence';
import { Logistics } from './views/Logistics';
import { AdminDashboard } from './views/AdminDashboard';
import { Settings } from './views/Settings';

function AppContent() {
  const { activeTab, isAuthenticated } = useApp();

  // If on landing or not authenticated, handle routing
  if (activeTab === 'landing') {
    return <LandingPage />;
  }

  if (activeTab === 'auth') {
    return <Auth />;
  }

  // Dashboard layout wrapper
  if (isAuthenticated) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-main-content">
          <Header />
          <main className="app-view-container animate-fade-in">
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'marketplace' && <Marketplace />}
            {activeTab === 'material-detail' && <MaterialDetail />}
            {activeTab === 'carbon' && <CarbonDashboard />}
            {activeTab === 'financial' && <FinancialDashboard />}
            {activeTab === 'copilot' && <Copilot />}
            {activeTab === 'intelligence' && <MarketIntelligence />}
            {activeTab === 'logistics' && <Logistics />}
            {activeTab === 'admin' && <AdminDashboard />}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    );
  }

  // Fallback to landing if user tries to access app views without authentication
  return <LandingPage />;
}

export default AppContent;
