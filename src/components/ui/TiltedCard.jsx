import { useRef, useState } from 'react';
import { useMotionTemplate, useMotionValue, useTransform, motion } from 'motion/react';
import './TiltedCard.css';

export default function TiltedCard({
  imageSrc,
  altText = '',
  captionText = '',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent,
  onClick
}) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(x, [0, 1], [-rotateAmplitude, rotateAmplitude]);
  const scale = useMotionValue(1);
  const transform = useMotionTemplate`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x.set(nx);
    y.set(ny);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  const handleEnter = () => {
    scale.set(scaleOnHover);
  };

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{ height: containerHeight, width: containerWidth, margin: 0 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      onClick={onClick}
    >
      {showMobileWarning && <div className="tilted-card-mobile-alert">Tilt on desktop for effect</div>}
      <motion.div
        className="tilted-card-inner"
        style={{
          height: '100%',
          width: '100%',
          transform,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{ width: imageWidth, height: imageHeight, aspectRatio: '3/4', objectFit: 'cover' }}
        />
        {displayOverlayContent && (
          <div className="tilted-card-overlay" style={{ pointerEvents: 'none' }}>
            {overlayContent}
          </div>
        )}
        {showTooltip && captionText && (
          <span className="tilted-card-caption" style={{ bottom: 8, left: 8 }}>
            {captionText}
          </span>
        )}
      </motion.div>
    </figure>
  );
}
