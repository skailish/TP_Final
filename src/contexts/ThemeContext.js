import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const handleThemeClick = () => {
    const toggleTheme = theme === "dark" ? "light" : "dark";
    setTheme(toggleTheme);
  };

  return (
    <ThemeContext.Provider value={{ handleThemeClick, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
export { ThemeProvider };
