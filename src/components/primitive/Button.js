import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

const Button = ({ children, forwardedRef, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      ref={forwardedRef}
      tabIndex="0"
      className={`button ${theme}`}
      {...props}
    >
      {children}
    </button>
  );
};

const forwardedButton = React.forwardRef(Button);

export default forwardedButton;
