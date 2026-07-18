import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CircularityGauge, AreaChart } from '../components/Charts';
import { 
  Leaf, 
  TrendingUp, 
  DollarSign, 
  ChevronRight, 
  Zap, 
  FileText, 
  ArrowUpRight, 
  Recycle,
  Sparkles,
  Search
} from 'lucide-react';

export const DashboardOverview = () => {
  const { setActiveTab, user, listings, setSelectedMaterialId } = useApp();
  const [copilotQuickText, setCopilotQuickText] = useState('');

  const handleCopilotQuickSubmit = (e) => {
    e.preventDefault();
    if (!copilotQuickText.trim()) return;
    // Set text in Copilot input and open Copilot view
    setActiveTab('copilot');
    // We can handle communication between components via context
  };

  const chartData = [120, 180, 240, 310, 480, 520, 680];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="dashboard-overview">
      {/* Metric Cards Row */}
      <div className="metrics-grid">
        <div className="metric-card glass hover-lift">
          <div className="metric-icon-wrapper green">
            <Leaf size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Scope 3 CO₂ Saved</span>
            <h3 className="metric-value font-display">{user.carbonSavings.toLocaleString()} Tons</h3>
            <span className="metric-trend positive">+14.2% vs last Q</span>
          </div>
        </div>

        <div className="metric-card glass hover-lift">
          <div className="metric-icon-wrapper blue">
            <Recycle size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Landfill Waste Diverted</span>
            <h3 className="metric-value font-display">{user.wasteDiverted.toLocaleString()} Tons</h3>
            <span className="metric-trend positive">89.4% diversion rate</span>
          </div>
        </div>

        <div className="metric-card glass hover-lift">
          <div className="metric-icon-wrapper yellow">
            <DollarSign size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Circular Revenue & Savings</span>
            <h3 className="metric-value font-display">${user.financialBenefit.toLocaleString()}</h3>
            <span className="metric-trend positive">+$112k disposal costs avoided</span>
          </div>
        </div>

        <div className="metric-card glass circularity-gauge-card hover-lift">
          <CircularityGauge score={user.esgScore} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Side: Chart & Active Exchanges */}
        <div className="dashboard-left-col">
          {/* Carbon Offset Trend Chart Card */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <div>
                <h3 className="panel-title font-display">Diverted Carbon Projection</h3>
                <p className="panel-subtitle">Monthly offset accumulation (Tons CO₂e)</p>
              </div>
              <span className="panel-badge green">verified ledger</span>
            </div>
            <div className="panel-body">
              <div style={{ height: '210px' }}>
                <AreaChart data={chartData} labels={chartLabels} />
              </div>
            </div>
          </div>

          {/* Active Material Exchanges Table */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Active Exchange Flows</h3>
              <button onClick={() => setActiveTab('marketplace')} className="panel-action-btn">
                View All Marketplace <ChevronRight size={16} />
              </button>
            </div>
            <div className="panel-body">
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Material Stream</th>
                      <th>Quantity</th>
                      <th>Exchange Node</th>
                      <th>Market Value</th>
                      <th>Carbon Metric</th>
                      <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.slice(0, 3).map((lst) => (
                      <tr 
                        key={lst.id} 
                        className="clickable-row"
                        onClick={() => {
                          setSelectedMaterialId(lst.id);
                          setActiveTab('material-detail');
                        }}
                      >
                        <td className="table-bold">{lst.title}</td>
                        <td>{lst.quantity}</td>
                        <td>{lst.location}</td>
                        <td>{lst.price}</td>
                        <td className="text-emerald">{lst.carbonSaved}</td>
                        <td style={{ textAlign: 'right' }}>
                          <span className="table-status-pill green">active matches</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Recommendations & Quick Actions */}
        <div className="dashboard-right-col">
          {/* AI Recommendation Engine */}
          <div className="dashboard-panel glass ai-recs-panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} className="text-emerald animate-pulse" />
                <h3 className="panel-title font-display">AI Circular Recommendation</h3>
              </div>
            </div>
            <div className="panel-body">
              <div className="ai-rec-card glass">
                <span className="ai-rec-tag">High-Yield Match</span>
                <h4 className="font-display">Chevron HDPE Pellets Replacement</h4>
                <p>
                  AI verified: Recycled Polyethylene pellets listed by TexChem match EcoFlow pipeline feedstock raw specifications (98.5% purity).
                </p>
                <div className="ai-rec-stats">
                  <div className="ai-rec-stat">
                    <span>Carbon savings</span>
                    <strong>120 Tons CO₂</strong>
                  </div>
                  <div className="ai-rec-stat">
                    <span>Disposal cost avoided</span>
                    <strong>$12,500</strong>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedMaterialId('mat-001');
                    setActiveTab('material-detail');
                  }} 
                  className="btn-primary w-full"
                  style={{ marginTop: '12px' }}
                >
                  Inspect Match Details <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="ai-rec-card glass" style={{ marginTop: '12px' }}>
                <span className="ai-rec-tag yellow">Logistics Optimization</span>
                <h4 className="font-display">Gary, IN Slag Shipping</h4>
                <p>
                  Barge transport recommended over trucking for Gary metallurgical slag: reduces transport emissions by 74% and cost by $3,200.
                </p>
                <button onClick={() => setActiveTab('logistics')} className="btn-secondary w-full" style={{ marginTop: '12px' }}>
                  Open Logistics Plan
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Quick Action Hub</h3>
            </div>
            <div className="panel-body flex-col-gap">
              {/* Quick AI Search Form */}
              <form onSubmit={handleCopilotQuickSubmit} className="quick-search-form">
                <input 
                  type="text" 
                  value={copilotQuickText}
                  onChange={(e) => setCopilotQuickText(e.target.value)}
                  placeholder="Ask AI Copilot (e.g. recycle HDPE)..." 
                  className="quick-search-input"
                />
                <button type="submit" className="quick-search-btn">
                  <Search size={16} />
                </button>
              </form>

              <button 
                onClick={() => {
                  setSelectedMaterialId(null);
                  setActiveTab('marketplace');
                }} 
                className="btn-primary w-full"
              >
                List Material for Exchange
              </button>

              <button onClick={() => setActiveTab('carbon')} className="btn-secondary w-full">
                <FileText size={16} /> Generate ESG Audit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
