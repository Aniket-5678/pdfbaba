import { useEffect, useRef } from "react";

const BannerAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const currentAdRef = adRef.current;

    if (currentAdRef) {
      console.log("Banner Ad mounted or updated");

      // Creating the first script (atOptions)
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key': '37e09e5650b41876a01bf6b363ff425c',
          'format': 'iframe',
          'height': 250,
          'width': 300,
          'params': {}
        };
      `;

      // Creating the second script (invoke.js)
      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "//www.highperformanceformat.com/37e09e5650b41876a01bf6b363ff425c/invoke.js";
      script2.async = true;

      // Append both scripts to the ad container
      currentAdRef.appendChild(script1);
      currentAdRef.appendChild(script2);
    }

    return () => {
      if (adRef.current) {
        console.log("Cleaning up Banner Ad");
        adRef.current.innerHTML = ""; // Remove scripts on unmount
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "100%",
        height: "250px", // Banner size
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent", // Make background transparent
      }}
    />
  );
};

export default BannerAd;
