import React from "react";

const PopunderAd = () => {
  const handleAdClick = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//pl25749045.effectiveratecpm.com/99/0c/d5/990cd5e49735ddf7ebeb3acad08da550.js";
    script.async = true;
    document.body.appendChild(script);
  };

  return (
    <button onClick={handleAdClick} style={{ padding: "10px 20px", cursor: "pointer" }}>
      Click to Open Popunder Ad
    </button>
  );
};

export default PopunderAd;
