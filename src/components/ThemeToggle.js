import React, { useContext } from "react";

import { LightbulbFlash as LightOn } from "@styled-icons/remix-fill/LightbulbFlash";
import { LightbulbFlash as LightOff } from "@styled-icons/remix-line/LightbulbFlash";

import ThemeContext from "../contexts/ThemeContext";

const ThemeToggle = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {theme === "dark" ? (
        <LightOn
          className={`nav-icon ${theme}`}
          {...props}
          title={"Change the theme"}
        />
      ) : (
        <LightOff
          className={`nav-icon ${theme}`}
          {...props}
          title={"Change the theme"}
        />
      )}
    </>
  );
};

export default ThemeToggle;
