import { useEffect, useRef } from "react";

const SocialBarAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const currentAdRef = adRef.current; // Store the current ref value in a local variable

    if (currentAdRef) {
      console.log("Social Bar Ad mounted");

      // Creating the script for the social bar ad
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//pl25750785.profitablecpmrate.com/e9/ae/84/e9ae8430553e56b0c3ca13c8e37d084b.js";
      script.async = true;

      // Append the script to the ad container
      currentAdRef.appendChild(script);
    }

    return () => {
      if (currentAdRef) { // Use the local variable instead of 'adRef.current'
        console.log("Cleaning up Social Bar Ad");
        currentAdRef.innerHTML = ""; // Remove the script on unmount
      }
    };
  }, []); // Empty dependency array means it runs only on mount/unmount

  return (
    <div
      ref={adRef}
      style={{
        width: "100%",
        position: "fixed",  // Fixed position to keep it in place
        bottom: 0,          // Placed at the bottom of the screen
        left: 0,
        backgroundColor: "transparent",
        zIndex: 9999,       // To ensure it appears on top of other content
      }}
    />
  );
};

export default SocialBarAd;
