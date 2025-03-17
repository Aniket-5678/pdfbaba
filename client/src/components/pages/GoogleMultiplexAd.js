import React, { useEffect } from "react";

const GoogleMultiplexAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-format="autorelaxed"
    data-ad-client="ca-pub-3816347733684991"
    data-ad-slot="5634436210"
    data-full-width-responsive="true"
  ></ins>
  );
};

export default GoogleMultiplexAd;
