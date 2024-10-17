import Script from "next/script";
import React from "react";
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any; // Since the type is provided by Facebook SDK, 'any' works here
  }
}

const FacebookSDK: React.FC = () => {
  return (
    <Script
      strategy="lazyOnload"
      src="https://connect.facebook.net/en_US/sdk.js"
      onLoad={() => {
        // Initialize the Facebook SDK
        window.fbAsyncInit = function () {
          window.FB.init({
            xfbml: true,
            version: "v14.0", // Adjust version as needed
          });
        };
      }}
    />
  );
};

export default FacebookSDK;
