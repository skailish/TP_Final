import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

const Button = ({ children, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button className={`button ${theme}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
