import React from "react";

const Label = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};

export default Label;
