import React from "react";

const Container = ({ forwarderRef, as = "div", children, ...props }) => {
  const Component = as;

  return (
    <Component ref={forwarderRef} {...props}>
      {children}
    </Component>
  );
};

const forwardedContainer = React.forwardRef(Container);

export default forwardedContainer;
