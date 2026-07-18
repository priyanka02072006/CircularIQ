import React from 'react';
import { useApp } from '../context/AppContext';
import { AreaChart } from '../components/Charts';
import { DollarSign, TrendingUp, ShieldAlert, Sparkles, Building } from 'lucide-react';

export const FinancialDashboard = () => {
  const { user } = useApp();

  const cumulativeSavingsData = [12000, 32000, 68000, 112000, 154000, 184500, 296500];
  const cumulativeSavingsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="financial-dashboard-view">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-icon-wrapper yellow">
            <DollarSign size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Circularity Revenue</span>
            <h3 className="metric-value font-display">${user.financialBenefit.toLocaleString()}</h3>
            <p className="metric-sub">Revenue from secondary material sales</p>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper green">
            <TrendingUp size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Disposal Cost Avoided</span>
            <h3 className="metric-value font-display">$112,000</h3>
            <p className="metric-sub">Savings from diverted landfill fees</p>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper blue">
            <Building size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Net Economic Return</span>
            <h3 className="metric-value font-display">$296,500</h3>
            <p className="metric-sub">Total operational value generated</p>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="dashboard-grid">
        <div className="dashboard-left-col">
          {/* Cumulative Area Chart */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Cumulative Financial Value</h3>
              <p className="panel-subtitle">Total accumulated revenue and tipping cost avoidances (USD)</p>
            </div>
            <div className="panel-body">
              <div style={{ height: '210px' }}>
                <AreaChart data={cumulativeSavingsData} labels={cumulativeSavingsLabels} color="#3b82f6" />
              </div>
            </div>
          </div>

          {/* Pricing Indices Table */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Regional Secondary Commodity Index</h3>
              <p className="panel-subtitle">Current average spot prices vs. virgin base costs</p>
            </div>
            <div className="panel-body">
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Commodity Grade</th>
                      <th>Recycled Index</th>
                      <th>Virgin Cost</th>
                      <th>Variance</th>
                      <th>Market Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-bold">HDPE Pellets (Recycled clear)</td>
                      <td>$850 / Ton</td>
                      <td>$1,320 / Ton</td>
                      <td className="text-emerald">-35.6%</td>
                      <td>Stable</td>
                    </tr>
                    <tr>
                      <td className="table-bold">Class F Fly Ash</td>
                      <td>$65 / Ton</td>
                      <td>$115 / Ton</td>
                      <td className="text-emerald">-43.4%</td>
                      <td>Bullish (+4%)</td>
                    </tr>
                    <tr>
                      <td className="table-bold">Structural Steel H-Beams</td>
                      <td>$610 / Ton</td>
                      <td>$950 / Ton</td>
                      <td className="text-emerald">-35.7%</td>
                      <td>Stable</td>
                    </tr>
                    <tr>
                      <td className="table-bold">Lithium Cathode NMC Powder</td>
                      <td>$32,000 / Ton</td>
                      <td>$48,500 / Ton</td>
                      <td className="text-emerald">-34.0%</td>
                      <td>Volatile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Projections */}
        <div className="dashboard-right-col">
          <div className="dashboard-panel glass ai-projections-panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} className="text-emerald animate-pulse" />
                <h3 className="panel-title font-display">AI Savings Forecast</h3>
              </div>
            </div>
            <div className="panel-body flex-col-gap">
              <div className="forecast-card glass">
                <h4>Next 90 Days Projection</h4>
                <p>Based on current listing match vectors, our predictive model estimates:</p>
                <div className="forecast-metric">
                  <span>Additional Revenue:</span>
                  <strong>+$45,200</strong>
                </div>
                <div className="forecast-metric">
                  <span>Scope 3 Carbon savings:</span>
                  <strong>+380 Tons CO₂e</strong>
                </div>
              </div>

              <div className="forecast-card glass alert">
                <div className="alert-header">
                  <ShieldAlert size={16} className="text-yellow" />
                  <h4>Tipping Fees Update Warning</h4>
                </div>
                <p>
                  Michigan landfill tipping taxes are set to increase by **$8.50/Ton** on Sept 1st. Diversion of slag materials is highly recommended to protect operational margin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
