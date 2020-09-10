import React from "react";

const Option = ({ children, ...props }) => {
  return (
    <option {...props} tabindex="0">
      {children}
    </option>
  );
};

export default Option;
