import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Home } from "@styled-icons/ionicons-solid/Home";
import { Search } from "@styled-icons/bootstrap/Search";
import { Movie2 as Movie } from "@styled-icons/remix-fill/Movie2";
import { Tv as TV } from "@styled-icons/material-twotone/Tv";
import { LogIn } from "@styled-icons/ionicons-sharp/LogIn";
import { LogOut } from "@styled-icons/ionicons-sharp/LogOut";
import { LightbulbFlash as LightOn } from "@styled-icons/remix-fill/LightbulbFlash";
import { LightbulbFlash as LightOff } from "@styled-icons/remix-line/LightbulbFlash";

import ThemeContext from "../contexts/ThemeContext";

const Aside = () => {
  const { theme, handleThemeClick } = useContext(ThemeContext);

  return (
    <aside className={`aside ${theme}`}>
      <div className="nav-links">
        <NavLink to="/" activeClassName="selected" exact>
          <Home className={`nav-icon ${theme}`} />
        </NavLink>
        <NavLink to="/Movie" exact activeClassName="selected">
          <Movie className={`nav-icon ${theme}`} />
        </NavLink>
        <NavLink to="/TV" exact activeClassName="selected">
          <TV className={`nav-icon ${theme}`} />
        </NavLink>
        <Search className={`nav-icon ${theme}`} />
      </div>
      <div className="user-options">
        <a>
          <LogIn className={`nav-icon ${theme}`} />
        </a>
        <a>
          <LogOut className={`nav-icon ${theme}`} />
        </a>
        {theme === "dark" ? (
          <LightOn
            onClick={() => handleThemeClick(theme)}
            className={`nav-icon ${theme}`}
          />
        ) : (
          <LightOff
            onClick={() => handleThemeClick(theme)}
            className={`nav-icon ${theme}`}
          />
        )}
      </div>
    </aside>
  );
};

export default Aside;
