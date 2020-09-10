import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const toggleTheme = theme === "dark" ? "light" : "dark";
      setTheme(toggleTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ handleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
export { ThemeProvider };
