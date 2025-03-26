import React, { useState, useEffect } from "react";
import { setCookie, getCookie } from "../../utils/cookieUtils";

/**
 * Component to show the cookie consent banner
 * Allows the user to accept or reject non-essential cookies
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const hasConsent = getCookie("cookieConsent");
    if (!hasConsent) {
      // Show the banner if there is no prior consent
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    // Save consent for 365 days
    setCookie("cookieConsent", "all", 365);
    setVisible(false);
  };

  const acceptEssential = () => {
    // Save only consent for essential cookies
    setCookie("cookieConsent", "essential", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-6 z-50 shadow-lg rounded-t-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <h3 className="text-lg font-semibold mb-2">Cookie Policy</h3>
          <p className="text-sm">
            We use cookies to enhance your experience on our website. Essential
            cookies are necessary for the site's operation, while optional
            cookies help us improve our services.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptEssential}
            className="px-6 py-3 bg-indigo-700 hover:bg-indigo-700 text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Essential only
          </button>
          <button
            onClick={acceptAll}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Accept all
          </button>
          <a
            href="/cookie-policy"
            className="px-4 py-2 border-gray-300 border text-center text-gray-300 hover:bg-gray-800 text-sm transition-colors duration-300"
          >
            More information
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
