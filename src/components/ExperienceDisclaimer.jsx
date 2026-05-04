import { useEffect, useState } from 'react';

export default function ExperienceDisclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show the disclaimer for 3 seconds, then start the fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`disclaimer-overlay ${!isVisible ? 'fade-out' : ''}`}>
      <div className="disclaimer-content">
        <p className="disclaimer-text">
          View the Website on Desktop for the best Immersive experience
          </p>
	<p className="disclaimer-subtext">
    Mobile version is a bit nerfed :)
  </p>
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
      </div>
    </div>
  );
}
