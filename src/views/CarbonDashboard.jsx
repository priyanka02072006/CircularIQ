import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, PieChart } from '../components/Charts';
import { Leaf, Award, Download, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export const CarbonDashboard = () => {
  const { user } = useApp();
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const deptData = [450, 780, 210, 110, 900];
  const deptLabels = ['Mfg-1', 'Mfg-2', 'Foundry', 'Pkg', 'Assembly'];

  const divertData = [1280, 152];
  const divertLabels = ['Diverted', 'Landfill'];

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
      setReportReady(true);
    }, 2000);
  };

  return (
    <div className="carbon-dashboard-view">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-icon-wrapper green">
            <Leaf size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Scope 3 Savings (YTD)</span>
            <h3 className="metric-value font-display">{user.carbonSavings} Tons CO₂e</h3>
            <p className="metric-sub">Equivalent to 40,500 tree seedlings grown for 10 years</p>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper blue">
            <RefreshCw size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Diversion Rate</span>
            <h3 className="metric-value font-display">89.4%</h3>
            <p className="metric-sub">Industry baseline: 62% average</p>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper yellow">
            <Award size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Sustainability Tier</span>
            <h3 className="metric-value font-display">Platinum Grade</h3>
            <p className="metric-sub">Audit certification active</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-left-col">
          {/* Bar Chart Panel */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Carbon Savings by Department</h3>
              <p className="panel-subtitle">Performance breakdown per assembly node (Tons CO₂e)</p>
            </div>
            <div className="panel-body">
              <div style={{ height: '210px' }}>
                <BarChart data={deptData} labels={deptLabels} color="#10b981" />
              </div>
            </div>
          </div>

          {/* Landfill Diversion Pie Chart */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Landfill Diversion Ratio</h3>
              <p className="panel-subtitle">Total waste diverted vs. residual containment disposal</p>
            </div>
            <div className="panel-body flex-center" style={{ padding: '24px 0' }}>
              <PieChart data={divertData} labels={divertLabels} colors={['#10b981', '#ef4444']} />
            </div>
          </div>
        </div>

        {/* Right Column: ESG Audit Center */}
        <div className="dashboard-right-col">
          <div className="dashboard-panel glass esg-report-panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} className="text-emerald" />
                <h3 className="panel-title font-display">ESG Audit Certification</h3>
              </div>
            </div>
            <div className="panel-body flex-col-gap">
              <p>
                Generate verified environmental audit files compiled in accordance with standard CSRD and SEC disclosure guidelines.
              </p>

              {/* Loader Skeleton */}
              {generatingReport && (
                <div className="skeleton-loader-container glass">
                  <div className="skeleton-line width-70 animate-pulse" />
                  <div className="skeleton-line width-50 animate-pulse" style={{ marginTop: '8px' }} />
                  <div className="skeleton-line width-90 animate-pulse" style={{ marginTop: '8px' }} />
                  <span className="loading-txt">Assembling ledger records...</span>
                </div>
              )}

              {/* Verified Report Summary */}
              {reportReady && !generatingReport && (
                <div className="esg-report-summary-card glass animate-fade-in">
                  <div className="report-summary-header">
                    <CheckCircle2 size={20} className="text-emerald" />
                    <h4>Audit Ledger File Compiled</h4>
                  </div>
                  <div className="report-metrics-list">
                    <div className="report-metric-row">
                      <span>Cert ID:</span>
                      <strong>CIQ-2026-99A8</strong>
                    </div>
                    <div className="report-metric-row">
                      <span>Emissions Offsets:</span>
                      <strong>{user.carbonSavings} t CO₂e</strong>
                    </div>
                    <div className="report-metric-row">
                      <span>Landfill Diverted:</span>
                      <strong>{user.wasteDiverted} t</strong>
                    </div>
                    <div className="report-metric-row">
                      <span>Ledger Status:</span>
                      <strong className="text-emerald">Validated</strong>
                    </div>
                  </div>
                  <button className="btn-secondary w-full" style={{ marginTop: '12px' }}>
                    <Download size={14} style={{ marginRight: '6px' }} /> Export PDF Certificate
                  </button>
                </div>
              )}

              {!generatingReport && !reportReady && (
                <button onClick={handleGenerateReport} className="btn-primary w-full">
                  Compile ESG Audit Logs
                </button>
              )}
            </div>
          </div>

          {/* Compliance Audits Table */}
          <div className="dashboard-panel glass" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h3 className="panel-title font-display">Compliance History</h3>
            </div>
            <div className="panel-body">
              <div className="compliance-logs-list">
                <div className="compliance-log-item glass">
                  <div>
                    <strong>Q1 Environmental Audit</strong>
                    <span>Validated Mar 15, 2026</span>
                  </div>
                  <span className="log-badge pass">Verified</span>
                </div>
                <div className="compliance-log-item glass">
                  <div>
                    <strong>EPA Waste Diversion Log</strong>
                    <span>Validated Jan 10, 2026</span>
                  </div>
                  <span className="log-badge pass">Verified</span>
                </div>
                <div className="compliance-log-item glass">
                  <div>
                    <strong>ISO 14001 Recertification</strong>
                    <span>Validated Nov 22, 2025</span>
                  </div>
                  <span className="log-badge pass">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
