import React, { useEffect } from "react";

const MonetagPushBanners = () => {
  useEffect(() => {
    (function (s, u, z, p) {
      s.src = u;
      s.setAttribute("data-zone", p);
      s.async = true;
      z.appendChild(s);
    })(
      document.createElement("script"),
      "https://zondagnet.net/tag.min.js", // Monetag script URL
      document.body,
      "9749965" // Aapka Zone ID
    );

    return () => {
      const scripts = document.querySelectorAll(
        "script[src='https://zondagnet.net/tag.min.js']"
      );
      scripts.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      className="monetag-ads"
      style={{
        width: "100%",          // full responsive width
        maxWidth: "728px",      // maximum ad width
        height: "90px",         // banner height (adjustable)
        margin: "20px auto",    // center alignment
        backgroundColor: "#f9f9f9", // placeholder bg before ad loads
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <span style={{ fontSize: "14px", color: "#666" }}>
        Loading ad...
      </span>
    </div>
  );
};

export default MonetagPushBanners;
