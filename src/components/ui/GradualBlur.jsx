import React, { useRef, useMemo } from 'react';
import { round, pow } from 'mathjs';

const CURVE_FUNCTIONS = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const getGradientDirection = (position) =>
  ({ top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' })[position] || 'to bottom';

export default function GradualBlur({
  position = 'bottom',
  strength = 2,
  height = '5rem',
  divCount = 5,
  curve = 'linear',
  opacity = 0.8,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;
  const direction = getGradientDirection(position);

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / divCount;
    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount;
      progress = curveFunc(progress);
      const blurValue = 0.0625 * (progress * divCount + 1) * strength;
      const p1 = round((increment * i - increment) * 10) / 10;
      const p2 = round(increment * i * 10) / 10;
      const p3 = round((increment * i + increment) * 10) / 10;
      const p4 = round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      divs.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
            pointerEvents: 'none'
          }}
        />
      );
    }
    return divs;
  }, [position, strength, divCount, curve, opacity, curveFunc, direction]);

  const isVertical = ['top', 'bottom'].includes(position);
  const containerStyle = useMemo(
    () => ({
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1000,
      ...(isVertical
        ? { height, width: '100%', left: 0, right: 0, [position]: 0 }
        : { width: height, height: '100%', top: 0, bottom: 0, [position]: 0 }),
      ...style
    }),
    [position, height, isVertical, style]
  );

  return (
    <div ref={containerRef} style={containerStyle} className={className}>
      {blurDivs}
    </div>
  );
}
