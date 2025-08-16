import { useState, useEffect } from 'react';
import NormalWidthTimeline from "./normal_width_timeline";
import SmallWidthTimeline from "./small_width_timeline";

const Timeline = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1020);
  };

  useEffect(() => {
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-[120px]">
      {isSmallScreen ? <SmallWidthTimeline /> : <NormalWidthTimeline />}
    </div>
  );
};

export default Timeline;