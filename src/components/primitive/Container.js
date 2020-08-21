import React from "react";

const Container = ({ as = "div", children, ref, ...props }) => {
  const Component = as;


   return(
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
};

export default Container;
