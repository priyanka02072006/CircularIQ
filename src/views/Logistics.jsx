import React, { useState } from 'react';
import { Truck, Ship, Calendar, ShieldCheck, MapPin, Leaf, Layers } from 'lucide-react';

export const Logistics = () => {
  // Calculator state
  const [origin, setOrigin] = useState('Houston, TX');
  const [destination, setDestination] = useState('Detroit, MI');
  const [volume, setVolume] = useState('50');
  const [mode, setMode] = useState('Multimodal (Rail + Truck)');

  const [carbonResult, setCarbonResult] = useState({
    co2: 4.8,
    virginCo2: 18.2,
    savings: 13.4,
    cost: '$4,200',
    time: '3 days'
  });

  const handleCalculate = (e) => {
    e.preventDefault();
    const volNum = parseFloat(volume) || 0;
    
    // Simple mock logic for calculation
    let factor = 0.05; // CO2 tons per mile per ton of material
    let baseDistance = 1200; // Houston to Detroit
    if (origin.includes('Reno') || destination.includes('Reno')) baseDistance = 2000;
    if (origin.includes('Gary') || destination.includes('Gary')) baseDistance = 300;

    let modeFactor = 1.0;
    let costPerTon = 80;
    let days = '4 days';
    
    if (mode === 'Flatbed Truck') {
      modeFactor = 1.2;
      costPerTon = 110;
      days = '2 days';
    } else if (mode === 'Class I Rail') {
      modeFactor = 0.3;
      costPerTon = 45;
      days = '5 days';
    } else if (mode === 'Multimodal (Rail + Truck)') {
      modeFactor = 0.5;
      costPerTon = 65;
      days = '3 days';
    }

    const calculatedCo2 = Math.round(volNum * baseDistance * factor * modeFactor * 0.001 * 10) / 10;
    const virginCo2Val = Math.round(calculatedCo2 * 3.8 * 10) / 10;
    const savingsVal = Math.round((virginCo2Val - calculatedCo2) * 10) / 10;
    const calculatedCost = `$${Math.round(volNum * costPerTon).toLocaleString()}`;

    setCarbonResult({
      co2: calculatedCo2,
      virginCo2: virginCo2Val,
      savings: savingsVal,
      cost: calculatedCost,
      time: days
    });
  };

  const activeShipments = [
    {
      id: 'ship-101',
      material: 'HDPE Pellets (Grade A)',
      origin: 'Houston, TX',
      destination: 'Detroit, MI',
      carrier: 'Union Pacific (Rail) + Logistics Direct',
      eta: 'July 22, 2026',
      status: 'In Transit (Chicago Hub)'
    },
    {
      id: 'ship-102',
      material: 'NMC Cathode Powder',
      origin: 'Reno, NV',
      destination: 'Reno Depot',
      carrier: 'Hazmat-Carrier Express',
      eta: 'Completed',
      status: 'Delivered'
    }
  ];

  return (
    <div className="logistics-view">
      {/* Metrics Header */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-icon-wrapper green">
            <Leaf size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Logistics Emissions Avoided</span>
            <h3 className="metric-value font-display">84.5 Tons CO₂e</h3>
            <span className="metric-trend positive">-22.4% vs baseline</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper blue">
            <Truck size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Multimodal Integration</span>
            <h3 className="metric-value font-display">88.5%</h3>
            <span className="metric-trend positive">Rail utilization active</span>
          </div>
        </div>

        <div className="metric-card glass">
          <div className="metric-icon-wrapper yellow">
            <Ship size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Average Transit Time</span>
            <h3 className="metric-value font-display">3.4 Days</h3>
            <span className="metric-trend positive">98% on-time delivery</span>
          </div>
        </div>
      </div>

      {/* Main Grid content */}
      <div className="dashboard-grid">
        {/* Left Side: Route emissions Calculator */}
        <div className="dashboard-left-col">
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <h3 className="panel-title font-display">Multimodal Logistics Router</h3>
              <p className="panel-subtitle">Calculate optimal shipping configurations based on carbon & financial parameters</p>
            </div>
            <div className="panel-body">
              <form onSubmit={handleCalculate} className="logistics-form">
                <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Origin Node</label>
                    <input 
                      type="text" 
                      value={origin} 
                      onChange={(e) => setOrigin(e.target.value)} 
                      className="drawer-input" 
                      required 
                    />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Destination Node</label>
                    <input 
                      type="text" 
                      value={destination} 
                      onChange={(e) => setDestination(e.target.value)} 
                      className="drawer-input" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Volume (Tons)</label>
                    <input 
                      type="number" 
                      value={volume} 
                      onChange={(e) => setVolume(e.target.value)} 
                      className="drawer-input" 
                      required 
                    />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Transport Mode Mode</label>
                    <select 
                      value={mode} 
                      onChange={(e) => setMode(e.target.value)} 
                      className="drawer-input"
                    >
                      <option>Multimodal (Rail + Truck)</option>
                      <option>Class I Rail</option>
                      <option>Flatbed Truck</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full" style={{ marginTop: '16px' }}>
                  Calculate Optimized Route
                </button>
              </form>

              {/* Calculator Output Widget */}
              {carbonResult && (
                <div className="logistics-output-widget glass animate-fade-in" style={{ marginTop: '20px' }}>
                  <div className="output-row">
                    <span>Estimated Shipping Cost:</span>
                    <strong className="text-emerald">{carbonResult.cost}</strong>
                  </div>
                  <div className="output-row">
                    <span>Transit Time:</span>
                    <strong>{carbonResult.time}</strong>
                  </div>
                  <div className="output-row">
                    <span>Carbon Footprint:</span>
                    <strong>{carbonResult.co2} Tons CO₂e</strong>
                  </div>
                  <div className="divider-line" />
                  <div className="output-row total">
                    <span>Scope 3 Carbon Avoided:</span>
                    <span className="text-emerald">+{carbonResult.savings} Tons CO₂e</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Active Shipping Tracking Logs */}
        <div className="dashboard-right-col">
          <div className="dashboard-panel glass">
            <h3 className="panel-title font-display">Active Shipments Logs</h3>
            <p className="panel-subtitle">Real-time status updates and ledger matching for transport routes</p>
            
            <div className="shipment-logs-list" style={{ marginTop: '16px' }}>
              {activeShipments.map(ship => (
                <div key={ship.id} className="shipment-log-card glass">
                  <div className="ship-card-header">
                    <h4>{ship.material}</h4>
                    <span className={`ship-status-badge ${ship.status.includes('Delivered') ? 'completed' : 'transit'}`}>
                      {ship.status}
                    </span>
                  </div>
                  <div className="ship-card-body">
                    <div className="ship-meta-row">
                      <MapPin size={12} />
                      <span>{ship.origin} ➔ {ship.destination}</span>
                    </div>
                    <div className="ship-meta-row">
                      <Truck size={12} />
                      <span>Carrier: {ship.carrier}</span>
                    </div>
                    <div className="ship-meta-row">
                      <Calendar size={12} />
                      <span>ETA: {ship.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
