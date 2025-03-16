import React, { useEffect } from "react";

const GoogleDisplayAds = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          width: "100%", // Ensures responsiveness
          maxWidth: "728px", // Standard desktop ad size
        }}
        data-ad-client="ca-pub-3816347733684991"
        data-ad-slot="2254929562"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleDisplayAds;
