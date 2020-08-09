import React from "react";

const Button = ({ children, ...props }) => {
  return <button className="button" {...props}>{children}</button>;
};

export default Button;
