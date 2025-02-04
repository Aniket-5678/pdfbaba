import { useEffect } from "react";

const NativeAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl25749166.profitablecpmrate.com/6e3b09de6f6074e527679b516dc65e2f/invoke.js";
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-6e3b09de6f6074e527679b516dc65e2f"></div>;
};

export default NativeAd;
