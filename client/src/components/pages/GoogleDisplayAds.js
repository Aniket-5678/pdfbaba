import React, { useEffect } from "react";

const GoogleDisplayAds = () => {
  useEffect(() => {
    const loadAds = () => {
      if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
        window.adsbygoogle.push({});
      }
    };

    setTimeout(loadAds, 500); // Delay for proper loading
  }, []);

  return (
    <>
      {/* Google AdSense Script (Ensure it's added once in your app) */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3816347733684991"
        crossOrigin="anonymous"
      ></script>

      {/* Horizontal Display Ad */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          margin: "20px auto",
          minHeight: "90px", // Ensures ad is visible
          overflow: "hidden", // Prevents UI breaking issues
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "728px", // Best for horizontal display ads
            height: "auto",
            minHeight: "90px",
            textAlign: "center",
          }}
          data-ad-client="ca-pub-3816347733684991"
          data-ad-slot="9271269219"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default GoogleDisplayAds;
