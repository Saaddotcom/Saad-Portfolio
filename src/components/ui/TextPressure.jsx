import { useEffect, useRef, useState, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const TextPressure = ({
  text = 'Muhammad Saad',
  alpha = false,
  textColor = '#00e5ff',
  className = '',
  minFontSize = 36
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    if (containerRef.current) {
      const { left, top, width: w, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW } = containerRef.current.getBoundingClientRect();
    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);
    setFontSize(newFontSize);
  }, [chars.length, minFontSize]);

  useEffect(() => {
    const debouncedSetSize = () => {
      const t = setTimeout(setSize, 100);
      return () => clearTimeout(t);
    };
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;
        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };
          const d = dist(mouseRef.current, charCenter);
          const scaleVal = getAttr(d, maxDist, 0.85, 1.15);
          const alphaVal = alpha ? getAttr(d, maxDist, 0.6, 1).toFixed(2) : 1;
          span.style.transform = `scale(${scaleVal})`;
          span.style.transformOrigin = 'center center';
          if (alpha) span.style.opacity = alphaVal;
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [alpha]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', width: '100%' }}>
      <div
        ref={titleRef}
        className="text-pressure-title"
        style={{
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: `clamp(${minFontSize}px, 10vw, 7rem)`,
          fontWeight: 700,
          lineHeight: 1.05,
          color: textColor,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.02em'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            style={{
              display: 'inline-block',
              color: textColor,
              transform: 'scale(1)'
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextPressure;
