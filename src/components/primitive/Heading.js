import React from "react";

const Heading = ({ level = 1, children }) => {
  const Heading = `h${level}`;
  return <Heading>{children}</Heading>;
};

export default Heading;
