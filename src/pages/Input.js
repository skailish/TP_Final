import React from "react";

const Input = (ref, { ...props }) => {
  return <input ref={ref} {...props} />;
};

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
