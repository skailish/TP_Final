import React from "react";

const Link = ({ children, ...props }) => {
  return (
    <a {...props} tabindex="0">
      {children}
    </a>
  );
};

export default Link;
