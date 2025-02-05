import { useEffect, useRef } from "react";

const SmallBannerAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const currentAdRef = adRef.current;

    if (currentAdRef) {
      console.log("Small Banner Ad mounted");

      // Creating first script (atOptions)
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key': 'eb1630be355ed6fe6b4fdd83898c0600',
          'format': 'iframe',
          'height': 60,
          'width': 468,
          'params': {}
        };
      `;

      // Creating second script (invoke.js)
      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "//www.highperformanceformat.com/eb1630be355ed6fe6b4fdd83898c0600/invoke.js";
      script2.async = true;

      // Append both scripts to the ad container
      currentAdRef.appendChild(script1);
      currentAdRef.appendChild(script2);
    }

    return () => {
      if (currentAdRef) {
        console.log("Cleaning up Small Banner Ad");
        currentAdRef.innerHTML = ""; // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "100%",
        height: "60px", // Banner size
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent", // Make background transparent
      }}
    />
  );
};

export default SmallBannerAd;
