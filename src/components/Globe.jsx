import React, { useRef, useEffect } from 'react';

export const Globe = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = 450);
    let height = (canvas.height = 450);
    let angle = 0;

    // Plotted industrial nodes (lat/lon approximated for rotation projection)
    const locations = [
      { name: 'Detroit (HQ)', lat: 42.33, lon: -83.04, color: '#10b981' },
      { name: 'Houston (HDPE)', lat: 29.76, lon: -95.36, color: '#3b82f6' },
      { name: 'Reno (Cathode)', lat: 39.52, lon: -119.81, color: '#f59e0b' },
      { name: 'Sacramento (Organics)', lat: 38.58, lon: -121.49, color: '#10b981' },
      { name: 'Pittsburgh (Steel)', lat: 40.44, lon: -79.99, color: '#8b5cf6' }
    ];

    const project = (lat, lon, rotation) => {
      const radLat = (lat * Math.PI) / 180;
      const radLon = (lon * Math.PI) / 180 + rotation;

      // Spherical coordinates
      const radius = 160;
      const x = radius * Math.cos(radLat) * Math.sin(radLon);
      const y = -radius * Math.sin(radLat);
      const z = radius * Math.cos(radLat) * Math.cos(radLon); // depth

      return { x: x + width / 2, y: y + height / 2, z };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.004; // rotation speed

      // 1. Draw Globe Sphere Shadow and Background
      const isDark = theme === 'dark';
      const gradientBg = ctx.createRadialGradient(
        width / 2, height / 2, 80,
        width / 2, height / 2, 170
      );
      if (isDark) {
        gradientBg.addColorStop(0, 'rgba(17, 24, 39, 0.4)');
        gradientBg.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
      } else {
        gradientBg.addColorStop(0, 'rgba(243, 244, 246, 0.8)');
        gradientBg.addColorStop(1, 'rgba(16, 185, 129, 0.08)');
      }

      ctx.fillStyle = gradientBg;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 160, 0, Math.PI * 2);
      ctx.fill();

      // Outer atmosphere glow ring
      ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#10b981';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 161, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // 2. Draw Wireframe Grid Lines (Longitude)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 12; i++) {
        const gridAngle = angle + (i * Math.PI) / 6;
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
        
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const pt = project(lat, 0, gridAngle);
          if (pt.z >= 0) { // draw only front side
            if (lat === -90) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // Draw Wireframe Grid Lines (Latitude)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project(lat, lon, angle);
          if (pt.z >= 0) {
            if (lon === -180) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // 3. Project and Draw Location Markers
      const activeProjectedLocs = locations.map(loc => {
        const pt = project(loc.lat, loc.lon, angle);
        return { ...loc, pt };
      });

      // Draw Arcs representing trade routes between nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < activeProjectedLocs.length; i++) {
        const start = activeProjectedLocs[i];
        if (start.pt.z < 0) continue; // Skip back face

        for (let j = i + 1; j < activeProjectedLocs.length; j++) {
          const end = activeProjectedLocs[j];
          if (end.pt.z < 0) continue; // Skip back face

          // Create an arc curve
          const midX = (start.pt.x + end.pt.x) / 2;
          const midY = (start.pt.y + end.pt.y) / 2 - 25; // Arc height

          const gradientLine = ctx.createLinearGradient(start.pt.x, start.pt.y, end.pt.x, end.pt.y);
          gradientLine.addColorStop(0, start.color);
          gradientLine.addColorStop(1, end.color);

          ctx.strokeStyle = gradientLine;
          ctx.beginPath();
          ctx.moveTo(start.pt.x, start.pt.y);
          ctx.quadraticCurveTo(midX, midY, end.pt.x, end.pt.y);
          ctx.stroke();
        }
      }

      // Draw node points and labels
      activeProjectedLocs.forEach(loc => {
        if (loc.pt.z < 0) return; // Behind globe

        // Pulsing outer dot
        const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.3;
        ctx.fillStyle = loc.color;
        ctx.beginPath();
        ctx.arc(loc.pt.x, loc.pt.y, 4 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(loc.pt.x, loc.pt.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Location Label
        ctx.fillStyle = isDark ? '#e5e7eb' : '#374151';
        ctx.font = '10px Outfit, Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(loc.name, loc.pt.x, loc.pt.y - 10);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div className="globe-container" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '450px',
          height: '450px',
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '1'
        }}
      />
    </div>
  );
};
