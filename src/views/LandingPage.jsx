import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe } from '../components/Globe';
import { Particles } from '../components/Particles';
import { 
  Recycle, 
  ArrowRight, 
  Leaf, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Cpu, 
  DollarSign, 
  FileCheck,
  ChevronDown
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveTab, theme } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: '450k+', label: 'Tons Waste Diverted' },
    { value: '1.2M+', label: 'Tons CO₂e Offset' },
    { value: '$45M+', label: 'Enterprise ROI Generated' },
    { value: '98.4%', label: 'Exchange Logistics Score' }
  ];

  const trustedCompanies = [
    'General Motors', 'BASF Chemical', 'Nucor Steel', 'Georgia-Pacific', 'Caterpillar'
  ];

  const features = [
    {
      icon: Cpu,
      title: 'AI Sustainability Copilot',
      description: 'Interact with our domain-trained AI to classify raw materials, forecast recycling pricing, and identify immediate circular loop matches.'
    },
    {
      icon: Recycle,
      title: 'Industrial Resource Exchange',
      description: 'List secondary commodities, run real-time compliance checks, match bids, and lock logistics routes on a single enterprise exchange.'
    },
    {
      icon: Leaf,
      title: 'Carbon Ledger (Scope 3)',
      description: 'Track and verify carbon savings down to the kilogram. Generate audit-ready ESG report metrics automatically aligned with CSRD standards.'
    },
    {
      icon: TrendingUp,
      title: 'Commodity Market Pricing',
      description: 'Access regional price indexes, demand signals, and alternative material recommendation models driven by machine learning.'
    }
  ];

  const faqs = [
    {
      q: 'How does CircularIQ verify listings for compliance?',
      a: 'All companies on CircularIQ undergo a rigorous D-U-N-S business registry verification. Furthermore, material listings require laboratory specification sheets, chemical purity certifications, and are audit-checked by our AI matching engine before publication.'
    },
    {
      q: 'Can the platform integrate with our existing ERP systems?',
      a: 'Yes, CircularIQ offers premium enterprise API webhooks that sync with SAP, Oracle Cloud, and Microsoft Dynamics to automatically import waste logs and export transaction metrics.'
    },
    {
      q: 'How is the carbon offset calculation calculated?',
      a: 'We leverage EPA WARM (Waste Reduction Model) factors combined with Ecoinvent LCA databases. This measures the carbon difference between virgin extraction/processing and secondary recycling pathways, including logistics transport math.'
    }
  ];

  return (
    <div className="landing-page">
      <Particles theme={theme} />
      
      {/* Navbar Header */}
      <header className="landing-nav glass">
        <div className="nav-logo">
          <Recycle className="text-emerald animate-spin-slow" size={26} />
          <span className="logo-text font-display">Circular<span style={{ color: '#10b981' }}>IQ</span></span>
        </div>
        <div className="nav-links">
          <a href="#features">Platform</a>
          <a href="#marketplace-preview">Marketplace</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <button onClick={() => setActiveTab('auth')} className="btn-secondary">Sign In</button>
          <button onClick={() => setActiveTab('auth')} className="btn-primary">Launch Platform <ArrowRight size={16} /></button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge-wrapper animate-fade-in">
            <span className="hero-badge">
              <Leaf size={12} className="text-emerald" /> Enterprise Circular Economy Platform
            </span>
          </div>
          
          <h1 className="hero-title font-display">
            Industrial Waste.<br />
            <span className="text-gradient">Intelligent Value.</span>
          </h1>
          
          <p className="hero-subtitle">
            Transform secondary chemicals, polymers, and mineral slag streams into profitable inputs. 
            Automated Scope 3 emissions reporting, AI matching, and zero-carbon optimized logistics.
          </p>

          <div className="hero-buttons">
            <button onClick={() => setActiveTab('auth')} className="btn-primary btn-lg">
              Get Started <ArrowRight size={18} />
            </button>
            <button onClick={() => setActiveTab('auth')} className="btn-secondary btn-lg">
              Book Enterprise Demo
            </button>
          </div>
        </div>

        <div className="hero-media">
          <div className="globe-wrapper glass">
            <Globe theme={theme} />
            <div className="globe-pulse-overlay" />
          </div>
        </div>
      </section>

      {/* Trusted By Grid */}
      <section className="trusted-section">
        <h4 className="trusted-title">SUPPORTING CIRCULAR LOOPS AT SCALE</h4>
        <div className="trusted-grid">
          {trustedCompanies.map((company, index) => (
            <div key={index} className="trusted-logo font-display">
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Statistics section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass">
              <h2 className="stat-value font-display">{stat.value}</h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title font-display">Enterprise-Grade Intelligence</h2>
          <p className="section-subtitle">
            CircularIQ replaces fragmented spreadsheets with unified circular operations management.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="feature-card glass hover-lift">
                <div className="feature-icon-wrapper">
                  <Icon size={24} className="text-emerald" />
                </div>
                <h3 className="feature-title font-display">{feat.title}</h3>
                <p className="feature-description">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module Previews */}
      <section id="marketplace-preview" className="preview-section">
        <div className="preview-container glass">
          <div className="preview-content">
            <span className="preview-badge">Live Exchange</span>
            <h2 className="preview-title font-display">Global Secondary Material Exchange</h2>
            <p className="preview-description">
              Find verified raw inputs listed directly by other manufacturers. View chemical compositions, test certificates, proximity shipping distances, and carbon offset statistics.
            </p>
            <button onClick={() => setActiveTab('auth')} className="btn-secondary">
              Explore Material Marketplace <ArrowRight size={16} />
            </button>
          </div>
          <div className="preview-visual">
            {/* Visual simulation of dashboard widget */}
            <div className="widget-mockup glass">
              <div className="widget-header">
                <span className="widget-dot red" />
                <span className="widget-dot yellow" />
                <span className="widget-dot green" />
                <span className="widget-title">Active Market Matches</span>
              </div>
              <div className="widget-body">
                <div className="mock-list-item">
                  <div className="mock-item-info">
                    <span className="mock-item-name">HDPE Pellets (98.5% Purity)</span>
                    <span className="mock-item-seller">TexChem Solutions</span>
                  </div>
                  <span className="mock-item-match">96% Match</span>
                </div>
                <div className="mock-list-item">
                  <div className="mock-item-info">
                    <span className="mock-item-name">Granulated Slag (Class F)</span>
                    <span className="mock-item-seller">Midwest Steel</span>
                  </div>
                  <span className="mock-item-match">94% Match</span>
                </div>
                <div className="mock-list-item">
                  <div className="mock-item-info">
                    <span className="mock-item-name">NMC Battery Cathode Scrap</span>
                    <span className="mock-item-seller">LithiumCycle Labs</span>
                  </div>
                  <span className="mock-item-match">99% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2 className="section-title font-display">Scale With Your Operations</h2>
          <p className="section-subtitle">
            Flexible packages suited for regional recycling teams up to multinational factories.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card glass">
            <h3 className="plan-name">Regional Loop</h3>
            <div className="plan-price font-display">$850<span>/mo</span></div>
            <p className="plan-description">For mid-size plants looking to exchange waste and report carbon emissions.</p>
            <ul className="plan-features">
              <li><FileCheck size={16} /> 5 Active Listings</li>
              <li><FileCheck size={16} /> Regional Map Routing</li>
              <li><FileCheck size={16} /> Basic Carbon Statistics</li>
              <li><FileCheck size={16} /> AI Sustainability Copilot Access</li>
            </ul>
            <button onClick={() => setActiveTab('auth')} className="btn-secondary w-full">Start Exchange</button>
          </div>

          <div className="pricing-card glass popular">
            <div className="popular-badge">RECOMMENDED</div>
            <h3 className="plan-name">Enterprise Core</h3>
            <div className="plan-price font-display">$2,450<span>/mo</span></div>
            <p className="plan-description">For enterprise manufacturing platforms needing multi-site logistics and verified audits.</p>
            <ul className="plan-features">
              <li><FileCheck size={16} /> Unlimited Listings</li>
              <li><FileCheck size={16} /> Multimodal Logistics Planner</li>
              <li><FileCheck size={16} /> Scope 3 Carbon ledger exports</li>
              <li><FileCheck size={16} /> API integrations for ERP</li>
              <li><FileCheck size={16} /> Verified ESG ESG certification</li>
            </ul>
            <button onClick={() => setActiveTab('auth')} className="btn-primary w-full">Upgrade Enterprise</button>
          </div>

          <div className="pricing-card glass">
            <h3 className="plan-name">Global Conglomerate</h3>
            <div className="plan-price font-display">Custom</div>
            <p className="plan-description">For multinational corporate structures with complex logistics networks and compliance needs.</p>
            <ul className="plan-features">
              <li><FileCheck size={16} /> Dedicated logistics brokers</li>
              <li><FileCheck size={16} /> Tailored machine learning models</li>
              <li><FileCheck size={16} /> Custom ESG reporting templates</li>
              <li><FileCheck size={16} /> 24/7 Priority support hotline</li>
            </ul>
            <button onClick={() => setActiveTab('auth')} className="btn-secondary w-full">Contact Advisory Board</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <h2 className="section-title font-display">Frequently Answered Queries</h2>
        </div>
        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item glass ${activeFaq === idx ? 'active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="faq-question font-display">
                <span>{faq.q}</span>
                <ChevronDown size={18} className="faq-icon" />
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="nav-logo">
              <Recycle className="text-emerald" size={24} />
              <span className="logo-text font-display">Circular<span style={{ color: '#10b981' }}>IQ</span></span>
            </div>
            <p className="footer-tagline">
              Transforming Industrial Waste into Business Value.
            </p>
          </div>
          <div className="footer-links-col">
            <h4>Solutions</h4>
            <a href="#features">AI Copilot</a>
            <a href="#features">Marketplace</a>
            <a href="#features">Carbon Ledger</a>
          </div>
          <div className="footer-links-col">
            <h4>Advisory</h4>
            <a href="#">Audit Standards</a>
            <a href="#">SEC Compliance</a>
            <a href="#">Methodology docs</a>
          </div>
          <div className="footer-links-col">
            <h4>Resources</h4>
            <a href="#">API docs</a>
            <a href="#">Support Hub</a>
            <a href="#">Security audits</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CircularIQ Inc. All rights reserved. SEC Registered Circular Exchange.</span>
          <div className="footer-socials">
            <a href="#">Terms</a>
            <a href="#">Privacy policy</a>
            <a href="#">ISO Certificate</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
