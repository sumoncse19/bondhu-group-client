import React from "react";
import { FaFacebook } from "react-icons/fa";

const FacebookPageEmbed: React.FC = () => {
  return (
    <div
      className="fb-page"
      data-href="https://www.facebook.com/bondhugroupbd"
      data-tabs="timeline"
      data-width="500"
      data-height=""
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/bondhugroupbd"
        className="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/bondhugroupbd" target="_blank">
          {" "}
          <FaFacebook />
        </a>
      </blockquote>
    </div>
  );
};

export default FacebookPageEmbed;
