import React from "react";

const Link = ({ children, ...props }) => {
  return (
    <a {...props} tabIndex="0">
      {children}
    </a>
  );
};

export default Link;
