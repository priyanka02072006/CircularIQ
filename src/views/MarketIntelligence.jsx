import React from 'react';
import { AreaChart } from '../components/Charts';
import { Sparkles, TrendingUp, HelpCircle, ArrowUpRight } from 'lucide-react';

export const MarketIntelligence = () => {
  const polymerIndexData = [810, 820, 835, 840, 850];
  const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="market-intelligence-view">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-icon-wrapper green">
            <TrendingUp size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">ML Polymer index</span>
            <h3 className="metric-value font-display">$850 / Ton</h3>
            <span className="metric-trend positive">+1.2% this week</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper blue">
            <Sparkles size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">High-Demand Sectors</span>
            <h3 className="metric-value font-display">Battery Recyclables</h3>
            <span className="metric-trend positive">+34.2% YoY growth</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper yellow">
            <HelpCircle size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Suggested By-product</span>
            <h3 className="metric-value font-display">Fly Ash Loops</h3>
            <span className="metric-trend positive">98% cement compatibility</span>
          </div>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="dashboard-grid">
        <div className="dashboard-left-col">
          {/* Price Forecast Trend */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Polymer Exchange Spot Index</h3>
              <p className="panel-subtitle">Historical average exchange spot prices for high-grade HDPE</p>
            </div>
            <div className="panel-body">
              <div style={{ height: '210px' }}>
                <AreaChart data={polymerIndexData} labels={labels} color="#10b981" />
              </div>
            </div>
          </div>

          {/* Alternative Reuse Pathways Catalog */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Circular Optimization Catalog</h3>
              <p className="panel-subtitle">Alternative reuse suggestions analyzed by our ML matching algorithm</p>
            </div>
            <div className="panel-body">
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Waste By-Product</th>
                      <th>Primary Industry</th>
                      <th>Alternative Reuse Loop</th>
                      <th>Avg Value Generation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-bold">Class F Fly Ash</td>
                      <td>Coal Power Utilities</td>
                      <td>Portland Cement aggregate additive</td>
                      <td className="text-emerald">+$65 / Ton</td>
                    </tr>
                    <tr>
                      <td className="table-bold">Blast Furnace Slag</td>
                      <td>Iron & Steel smelting</td>
                      <td>High-durability structural concrete</td>
                      <td className="text-emerald">+$45 / Ton</td>
                    </tr>
                    <tr>
                      <td className="table-bold">LCO Cathode Powder</td>
                      <td>Battery Manufactures</td>
                      <td>Secondary EV grid storage cell packs</td>
                      <td className="text-emerald">+$32,000 / Ton</td>
                    </tr>
                    <tr>
                      <td className="table-bold">Wood Pomace / Organic pulp</td>
                      <td>Agricultural processing</td>
                      <td>Anaerobic biogas digester fuel feedstock</td>
                      <td className="text-emerald">+$15 / Ton</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Demand Alerts */}
        <div className="dashboard-right-col">
          <div className="dashboard-panel glass">
            <h3 className="panel-title font-display">Regional Demand Signals</h3>
            <p className="panel-subtitle">Urgent buying requirements broadcasted by verified organizations</p>
            
            <div className="demand-signals-list">
              <div className="demand-signal-card glass">
                <div className="signal-header">
                  <strong>Vanguard Eco-Builders</strong>
                  <span className="signal-badge polymers">Polymers</span>
                </div>
                <p>Seeking 120 Tons of high-density clear polymer regrind. Target price: $860/Ton. Delivery Detroit spur.</p>
                <div className="signal-footer">
                  <span>Expires in 3 days</span>
                  <a href="#">Inspect Lead <ArrowUpRight size={14} /></a>
                </div>
              </div>

              <div className="demand-signal-card glass" style={{ marginTop: '12px' }}>
                <div className="signal-header">
                  <strong>Great Lakes Cement</strong>
                  <span className="signal-badge minerals">Minerals</span>
                </div>
                <p>Immediate requisition: 400 Tons ground granulated slag aggregate. Proximity Indiana or Illinois.</p>
                <div className="signal-footer">
                  <span>Expires in 12 days</span>
                  <a href="#">Inspect Lead <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
