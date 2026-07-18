import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Leaf, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Sparkles, 
  ChevronRight,
  MessageSquare,
  BadgeAlert
} from 'lucide-react';

export const MaterialDetail = () => {
  const { 
    listings, 
    selectedMaterialId, 
    setSelectedMaterialId, 
    setActiveTab, 
    sendMessage, 
    setActiveChatCompany 
  } = useApp();

  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([
    { bidder: 'Eco-Processors LLC', amount: '$810 / Ton', time: 'Yesterday', status: 'Under Review' }
  ]);
  const [successMsg, setSuccessMsg] = useState('');

  const item = listings.find(l => l.id === selectedMaterialId) || listings[0];

  const handlePlaceBid = (e) => {
    e.preventDefault();
    if (!bidAmount) return;
    
    const newBid = {
      bidder: 'EcoFlow Technologies (You)',
      amount: `$${bidAmount} / Ton`,
      time: 'Just now',
      status: 'Pending Verification'
    };

    setBids(prev => [newBid, ...prev]);
    setSuccessMsg('Bid submitted successfully. Cryptographic compliance tag generated.');
    setBidAmount('');

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleStartChat = () => {
    setActiveChatCompany(item.seller);
    setActiveTab('copilot');
    sendMessage(item.seller, `Hi, we are interested in your "${item.title}" listing. Let's discuss logistics details.`);
  };

  return (
    <div className="material-detail-view animate-fade-in">
      {/* Back Button */}
      <button onClick={() => { setSelectedMaterialId(null); setActiveTab('marketplace'); }} className="back-btn glass">
        <ArrowLeft size={16} /> Back to Resource Exchange
      </button>

      {/* Main Grid Layout */}
      <div className="material-detail-grid">
        {/* Left Column: Image, Description, Specs, Bidding */}
        <div className="detail-left-col">
          {/* Main Card */}
          <div className="detail-panel glass">
            <div className="detail-header-section">
              <span className="detail-category-tag">{item.category}</span>
              <h1 className="detail-title font-display">{item.title}</h1>
              <div className="detail-meta-row">
                <div className="meta-item">
                  <MapPin size={14} /> {item.location}
                </div>
                <div className="meta-item">
                  <span>Seller: <strong>{item.seller}</strong></span>
                  <span className="seller-verified-pill"><ShieldCheck size={10} /> DUNS Verified</span>
                </div>
              </div>
            </div>

            <div className="detail-image-gallery">
              <img src={item.images[0]} alt={item.title} className="detail-main-image" />
            </div>

            <div className="detail-body-section">
              <h3 className="section-subtitle font-display">Material Description</h3>
              <p className="detail-description-text">{item.description}</p>

              <h3 className="section-subtitle font-display" style={{ marginTop: '24px' }}>Technical Specifications</h3>
              <div className="detail-specs-table-wrapper">
                <table className="specs-table">
                  <tbody>
                    {item.specifications.map((spec, idx) => (
                      <tr key={idx}>
                        <td className="spec-label">{spec.name}</td>
                        <td className="spec-value">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Secure Bidding Portal */}
          <div className="detail-panel glass" style={{ marginTop: '24px' }}>
            <h3 className="panel-title font-display">Secure Transaction Portal</h3>
            <p className="panel-subtitle">Bids are subject to SEC compliance audits and contract logs.</p>
            
            <div className="bidding-container">
              <form onSubmit={handlePlaceBid} className="bid-entry-form">
                <div className="input-group">
                  <label>Offer Price ($ / Ton)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="number" 
                      placeholder="e.g. 830" 
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="bid-input"
                      required
                    />
                    <button type="submit" className="btn-primary">
                      Submit Verified Offer
                    </button>
                  </div>
                </div>
              </form>

              {successMsg && (
                <div className="success-banner animate-fade-in">
                  <ShieldCheck size={16} /> {successMsg}
                </div>
              )}

              <div className="bid-history-section">
                <h4 className="font-display">Current Bids Logs</h4>
                <div className="bids-list">
                  {bids.map((bid, index) => (
                    <div key={index} className="bid-list-item glass">
                      <div className="bid-bidder-info">
                        <strong>{bid.bidder}</strong>
                        <span>{bid.time}</span>
                      </div>
                      <div className="bid-val-status">
                        <strong className="text-emerald">{bid.amount}</strong>
                        <span className="bid-status-pill">{bid.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights, Carbon Math, Proximity, Actions */}
        <div className="detail-right-col">
          {/* Action Cards */}
          <div className="detail-panel glass action-panel-btn">
            <button onClick={handleStartChat} className="btn-primary w-full flex-center">
              <MessageSquare size={16} style={{ marginRight: '6px' }} /> Initiate Exchange Dialogue
            </button>
          </div>

          {/* Carbon Savings Math */}
          <div className="detail-panel glass carbon-math-panel" style={{ marginTop: '24px' }}>
            <div className="panel-header-icon flex-align">
              <Leaf className="text-emerald" size={20} />
              <h3 className="panel-title font-display">Emissions Diverted Math</h3>
            </div>
            <div className="panel-body">
              <div className="carbon-offset-total font-display">
                {item.carbonSaved}
              </div>
              <p className="offset-math-sub">CO₂ emissions avoided against virgin manufacturing standard.</p>
              
              <div className="carbon-breakdown-details">
                <div className="carbon-step">
                  <span>Virgin Resource Footprint</span>
                  <strong>{Math.round(parseFloat(item.quantity) * item.carbonFactor * 1.5)} t CO₂e</strong>
                </div>
                <div className="carbon-step text-emerald">
                  <span>Secondary Recyclate Footprint</span>
                  <strong>{Math.round(parseFloat(item.quantity) * item.carbonFactor * 0.5)} t CO₂e</strong>
                </div>
                <div className="divider-line" />
                <div className="carbon-step total font-display">
                  <span>Net Savings Carbon</span>
                  <span className="text-emerald">{item.carbonSaved}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations Panel */}
          <div className="detail-panel glass ai-copilot-detail-panel" style={{ marginTop: '24px' }}>
            <div className="panel-header-icon flex-align">
              <Sparkles className="text-emerald" size={20} />
              <h3 className="panel-title font-display">AI Copilot Circular Insights</h3>
            </div>
            <div className="panel-body flex-col-gap">
              <div className="ai-insight-box">
                <h5>Classification</h5>
                <p>{item.aiInsights.classification}</p>
              </div>
              <div className="ai-insight-box">
                <h5>Demand Forecast</h5>
                <p>{item.aiInsights.demandForecast}</p>
              </div>
              <div className="ai-insight-box">
                <h5>Price Prediction Model</h5>
                <p>{item.aiInsights.pricePrediction}</p>
              </div>
              <div className="ai-insight-box">
                <h5>Suggested Reuse Loop</h5>
                <ul>
                  {item.aiInsights.remanufactureIdeas.map((idea, idx) => (
                    <li key={idx}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Suggested Buyers / Matchmaking */}
          <div className="detail-panel glass" style={{ marginTop: '24px' }}>
            <h3 className="panel-title font-display">AI Circular Matches</h3>
            <p className="panel-subtitle">Proximity-verified buyers with active buy requisitions.</p>
            
            <div className="suggested-buyers-list">
              {item.suggestedBuyers.map((buyer, idx) => (
                <div key={idx} className="buyer-match-card glass">
                  <div className="buyer-match-header">
                    <h4>{buyer.name}</h4>
                    <span className="match-score-pill">{buyer.matchScore} Match</span>
                  </div>
                  <div className="buyer-match-meta">
                    <span>Proximity: {buyer.distance}</span>
                    <button onClick={handleStartChat} className="chat-link">
                      Chat <ChevronRight size={14} />
                    </button>
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
