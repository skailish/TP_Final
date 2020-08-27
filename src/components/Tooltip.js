import React, { useState, useContext } from "react";

import ThemeContext from "../contexts/ThemeContext";

const Tooltip = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);

  const [isShown, setisShown] = useState(false);
  const handleOnMouseEnter = () => setisShown(true);
  const handleOnMouseLeave = () => setisShown(false);

  return (
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      {children}
      <span className={`tooltip ${theme} ${isShown && "appear"}`}>{title}</span>
    </div>
  );
};

export default Tooltip;
