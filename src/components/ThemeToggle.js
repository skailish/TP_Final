import React, { useContext } from "react";

import { LightbulbFlash as LightOn } from "@styled-icons/remix-fill/LightbulbFlash";
import { LightbulbFlash as LightOff } from "@styled-icons/remix-line/LightbulbFlash";

import Container from "./primitive/Container";
import Text from "./primitive/Text";

import ThemeContext from "../contexts/ThemeContext";

const ThemeToggle = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container className="nav-icon-container" tabIndex="0" {...props}>
      {theme === "dark" ? (
        <>
          <LightOn
            className={`nav-icon ${theme}`}
            title={"Change the theme"}
            aria-hidden="true"
          />
          <Text className={`nav-text ${theme}`}>Light Mode</Text>
        </>
      ) : (
        <>
          <LightOff
            className={`nav-icon ${theme}`}
            title={"Change the theme"}
            aria-hidden="true"
          />
          <Text className={`nav-text ${theme}`}>Dark Mode</Text>
        </>
      )}
    </Container>
  );
};

export default ThemeToggle;
