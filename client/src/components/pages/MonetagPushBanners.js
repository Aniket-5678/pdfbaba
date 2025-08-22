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
    <div className="monetag-ads">
      {/* Monetag ad yaha inject hoga */}
    </div>
  );
};

export default MonetagPushBanners;
