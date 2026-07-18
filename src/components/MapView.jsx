import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MapView = ({ onSelectMaterial }) => {
  const { listings, theme } = useApp();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);

  // Plotted locations and routes
  const mainHubs = [
    { id: 'hub-1', name: 'Detroit HQ (Assembly)', x: 570, y: 160, type: 'hq' },
    { id: 'hub-2', name: 'Chicago Logistics Node', x: 530, y: 180, type: 'logistics' },
    { id: 'hub-3', name: 'Gulf Coast Shipping Port', x: 460, y: 360, type: 'port' }
  ];

  return (
    <div className="map-view-container" style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', borderRadius: '12px', background: 'var(--bg-app)', border: '1px solid var(--border-glass)' }}>
      {/* Map Control Info overlay */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', fontSize: '11px', color: 'var(--text-secondary)' }}>
        Active Exchange Nodes: <span style={{ color: '#10b981', fontWeight: 'bold' }}>{listings.length + mainHubs.length}</span>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 800 450" style={{ display: 'block' }}>
        {/* Background Grid Mesh */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-glass)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Abstract US Map Borders / Guides (Simple aesthetic shapes) */}
        <path
          d="M 100 150 Q 150 120 220 130 T 400 120 T 600 100 T 720 180 T 700 320 T 520 380 T 420 360 T 300 420 T 150 360 T 80 250 Z"
          fill="none"
          stroke="var(--border-glass)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Trade routes (Active connections from Listing locations to suggested buyers or HQ) */}
        {listings.map((lst, idx) => {
          const startX = lst.coordinates?.x || 100;
          const startY = lst.coordinates?.y || 100;
          
          // Connect to Detroit HQ or Logistics Node for demo
          const endX = idx % 2 === 0 ? 570 : 530;
          const endY = idx % 2 === 0 ? 160 : 180;
          
          const isSelected = activeRoute === lst.id;

          return (
            <g key={lst.id}>
              {/* Vector connection arc path */}
              <path
                d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 - 40} ${endX} ${endY}`}
                fill="none"
                stroke={isSelected ? '#10b981' : 'var(--border-glass)'}
                strokeWidth={isSelected ? '2' : '1'}
                strokeDasharray={isSelected ? 'none' : '4 4'}
                style={{ transition: 'stroke-width 0.2s, stroke 0.2s' }}
              />
              
              {/* Pulse particles flowing on routes */}
              <circle r="3" fill="#10b981">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 - 40} ${endX} ${endY}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Static Infrastructure Hub Markers */}
        {mainHubs.map(hub => (
          <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
            <rect x="-6" y="-6" width="12" height="12" rx="2" fill="var(--bg-surface)" stroke="#3b82f6" strokeWidth="2" />
            <circle r="2" fill="#3b82f6" />
            <text x="10" y="4" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">
              {hub.name}
            </text>
          </g>
        ))}

        {/* Interactive Material Listings Markers */}
        {listings.map(lst => {
          const x = lst.coordinates?.x || 100;
          const y = lst.coordinates?.y || 100;
          const isHovered = hoveredNode === lst.id;

          return (
            <g
              key={lst.id}
              transform={`translate(${x}, ${y})`}
              onMouseEnter={() => {
                setHoveredNode(lst.id);
                setActiveRoute(lst.id);
              }}
              onMouseLeave={() => {
                setHoveredNode(null);
                setActiveRoute(null);
              }}
              onClick={() => onSelectMaterial && onSelectMaterial(lst.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer pulsing anchor */}
              <circle r={isHovered ? 12 : 8} fill="rgba(16, 185, 129, 0.2)" style={{ transition: 'all 0.2s' }} />
              <circle r={isHovered ? 6 : 4} fill="#10b981" />
              <circle r="2" fill="#ffffff" />
              
              {/* Tooltip marker popup on hover */}
              {isHovered && (
                <g transform="translate(0, -22)" style={{ pointerEvents: 'none' }}>
                  <rect x="-80" y="-30" width="160" height="36" rx="6" fill="var(--bg-surface)" stroke="#10b981" strokeWidth="1" shadow="lg" />
                  <text x="0" y="-18" fill="var(--text-primary)" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {lst.title.length > 25 ? `${lst.title.substring(0, 22)}...` : lst.title}
                  </text>
                  <text x="0" y="-6" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {lst.quantity} • {lst.carbonSaved}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Map Legend */}
      <div style={{ position: 'absolute', bottom: '12px', right: '12px', padding: '8px', borderRadius: '6px', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span style={{ color: 'var(--text-primary)' }}>Material Listings</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'transparent', border: '2px solid #3b82f6' }} />
          <span style={{ color: 'var(--text-primary)' }}>Logistics Hubs</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '16px', height: '0px', borderTop: '2px dashed var(--border-glass)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Logistics Channels</span>
        </div>
      </div>
    </div>
  );
};
