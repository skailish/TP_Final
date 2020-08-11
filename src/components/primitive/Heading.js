import React from "react";

const Heading = ({ level = 1, children, ...props }) => {
  const Heading = `h${level}`;
  return <Heading {...props}>{children}</Heading>;
};

export default Heading;
