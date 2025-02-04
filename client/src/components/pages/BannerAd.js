import { useEffect } from "react";

const BannerAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.highperformanceformat.com/37e09e5650b41876a01bf6b363ff425c/invoke.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="ad-container"></div>;
};

export default BannerAd;
