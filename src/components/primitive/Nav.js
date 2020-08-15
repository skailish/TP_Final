import React from "react";

const Nav = ({ children, ...props }) => {
  return <nav {...props}>{children}</nav>;
};

export default Nav;
