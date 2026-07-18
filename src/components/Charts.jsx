import React from 'react';

// 1. Custom Area Chart
export const AreaChart = ({ data = [], labels = [], width = 500, height = 200, color = '#10b981', gradientId = 'chart-grad' }) => {
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...data, 10);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal;

  // Map data to SVG points
  const points = data.map((val, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((val - minVal) / range) * chartHeight;
    return { x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
    : '';

  return (
    <div className="custom-chart-wrapper" style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding + ratio * chartHeight;
          const val = Math.round(maxVal - ratio * range);
          return (
            <g key={idx}>
              <line 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="var(--border-glass)" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <text 
                x={padding - 5} 
                y={y + 4} 
                fill="var(--text-secondary)" 
                fontSize="10" 
                textAnchor="end"
                className="font-mono"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        {areaD && <path d={areaD} fill={`url(#${gradientId})`} />}

        {/* Main Line */}
        {pathD && (
          <path 
            d={pathD} 
            fill="none" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        )}

        {/* Data points */}
        {points.map((p, idx) => (
          <g key={idx} className="chart-dot-group">
            <circle 
              cx={p.x} 
              cy={p.y} 
              r="4" 
              fill="var(--bg-app)" 
              stroke={color} 
              strokeWidth="2" 
            />
            {/* Tooltip on hover */}
            <g className="chart-tooltip" style={{ opacity: 0, transition: 'opacity 0.2s' }}>
              <rect 
                x={p.x - 25} 
                y={p.y - 30} 
                width="50" 
                height="20" 
                rx="4" 
                fill="var(--bg-surface)" 
                stroke="var(--border-glass)" 
                strokeWidth="1" 
              />
              <text 
                x={p.x} 
                y={p.y - 17} 
                fill="var(--text-primary)" 
                fontSize="10" 
                textAnchor="middle" 
                fontWeight="bold"
              >
                {data[idx]}
              </text>
            </g>
          </g>
        ))}

        {/* X Axis Labels */}
        {labels.map((lbl, idx) => {
          const x = padding + (idx / (labels.length - 1)) * chartWidth;
          return (
            <text 
              key={idx} 
              x={x} 
              y={height - 8} 
              fill="var(--text-secondary)" 
              fontSize="10" 
              textAnchor="middle"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// 2. Custom Bar Chart
export const BarChart = ({ data = [], labels = [], width = 500, height = 200, color = '#3b82f6' }) => {
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxVal = Math.max(...data, 10);
  const barWidth = (chartWidth / data.length) * 0.6;
  const spacing = (chartWidth / data.length) * 0.4;

  return (
    <div className="custom-chart-wrapper" style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.5, 1].map((ratio, idx) => {
          const y = padding + ratio * chartHeight;
          const val = Math.round(maxVal * (1 - ratio));
          return (
            <g key={idx}>
              <line 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="var(--border-glass)" 
                strokeWidth="1" 
              />
              <text 
                x={padding - 5} 
                y={y + 4} 
                fill="var(--text-secondary)" 
                fontSize="10" 
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((val, idx) => {
          const barHeight = (val / maxVal) * chartHeight;
          const x = padding + idx * (barWidth + spacing) + spacing / 2;
          const y = height - padding - barHeight;

          return (
            <g key={idx} className="chart-bar-group">
              <rect 
                x={x} 
                y={y} 
                width={barWidth} 
                height={barHeight} 
                rx="4" 
                fill={color} 
                style={{ transition: 'all 0.5s ease' }}
              />
              <text 
                x={x + barWidth / 2} 
                y={y - 6} 
                fill="var(--text-primary)" 
                fontSize="10" 
                textAnchor="middle" 
                fontWeight="semibold"
              >
                {val}
              </text>
              <text 
                x={x + barWidth / 2} 
                y={height - 10} 
                fill="var(--text-secondary)" 
                fontSize="10" 
                textAnchor="middle"
              >
                {labels[idx]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 3. Custom Donut / Pie Chart
export const PieChart = ({ data = [], labels = [], colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'] }) => {
  const total = data.reduce((sum, val) => sum + val, 0);
  let accumulatedAngle = 0;

  return (
    <div className="custom-pie-container" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="45" fill="none" stroke="var(--border-glass)" strokeWidth="20" />
        {data.map((val, idx) => {
          const percentage = val / total;
          const angle = percentage * 360;
          const strokeDash = percentage * 2 * Math.PI * 45;
          const strokeOffset = (2 * Math.PI * 45) - (accumulatedAngle / 360) * 2 * Math.PI * 45;
          accumulatedAngle += angle;

          return (
            <circle
              key={idx}
              cx="70"
              cy="70"
              r="45"
              fill="none"
              stroke={colors[idx % colors.length]}
              strokeWidth="20"
              strokeDasharray={`${strokeDash} ${2 * Math.PI * 45}`}
              strokeDashoffset={strokeOffset}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          );
        })}
        {/* Inner Glass Text */}
        <circle cx="70" cy="70" r="35" fill="var(--bg-surface)" />
        <text x="70" y="66" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
          Circularity
        </text>
        <text x="70" y="82" fill="#10b981" fontSize="13" textAnchor="middle" fontWeight="black">
          89.4%
        </text>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {labels.map((lbl, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: colors[idx % colors.length] }} />
            <span style={{ color: 'var(--text-secondary)' }}>{lbl}:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
              {Math.round((data[idx] / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Circularity Index / Speedometer Gauge
export const CircularityGauge = ({ score = 88 }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Representing score as percentage of a 270 degree arc
  const arcLength = 270;
  const dashArray = (arcLength / 360) * circumference;
  const dashOffset = dashArray - (score / 100) * dashArray;

  return (
    <div className="gauge-chart-container" style={{ textAlign: 'center', display: 'inline-block' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="gauge-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {/* Background Track Arc */}
        <path
          d="M 25 95 A 50 50 0 1 1 95 95"
          fill="none"
          stroke="var(--border-glass)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Active Score Arc */}
        <path
          d="M 25 95 A 50 50 0 1 1 95 95"
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashArray} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Gauge Text */}
        <text x="60" y="60" fill="var(--text-primary)" fontSize="26" textAnchor="middle" fontWeight="black">
          {score}
        </text>
        <text x="60" y="78" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="medium">
          Circularity Index
        </text>
        <text x="60" y="94" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">
          OPTIMAL
        </text>
      </svg>
    </div>
  );
};
