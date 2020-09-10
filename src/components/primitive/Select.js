import React from "react";

const Select = ({ children, ...props }) => {
  return (
    <select {...props} tabindex="0">
      {children}
    </select>
  );
};

export default Select;
