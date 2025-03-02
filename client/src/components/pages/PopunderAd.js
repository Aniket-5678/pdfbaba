import React, { useEffect } from "react";

const PopunderAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//pl25749045.effectiveratecpm.com/99/0c/d5/990cd5e49735ddf7ebeb3acad08da550.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Component unmount hone par script remove ho jayega
    };
  }, []); // useEffect sirf ek baar chalega jab component mount hoga

  return null; // Yeh component UI me kuch render nahi karega
};

export default PopunderAd;
