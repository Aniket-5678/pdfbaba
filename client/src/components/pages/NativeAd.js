import React, { useEffect } from 'react';

const NativeAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//pl25749166.profitablecpmrate.com/6e3b09de6f6074e527679b516dc65e2f/invoke.js";
    script.setAttribute("data-cfasync", "false");

    // Enhanced error handling
    script.onerror = (error) => {
      console.error("Error loading script:", error);
      alert("Failed to load the ad. Please try again later.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-6e3b09de6f6074e527679b516dc65e2f"></div>;
};

export default NativeAd;
