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
import Tooltip from './Tooltip';
import ThemeContext from "../contexts/ThemeContext";

const Aside = () => {
  const { theme, handleThemeClick } = useContext(ThemeContext);

  return (
    <aside className={`aside ${theme}`}>
      <div className="nav-links">
        <NavLink to="/" activeClassName="selected" exact>
          <Tooltip title="Home">
            <Home className={`nav-icon ${theme}`} />
          </Tooltip>
        </NavLink>
        <NavLink to="/movies" exact activeClassName="selected">
          <Tooltip title="Movie">
            <Movie className={`nav-icon ${theme}`} />
          </Tooltip>
        </NavLink>
        <NavLink to="/tv" exact activeClassName="selected">
          <Tooltip title="Tv">
            <TV className={`nav-icon ${theme}`} />
          </Tooltip>
        </NavLink>
        <Tooltip title="Search">
          <Search className={`nav-icon ${theme}`} />
        </Tooltip>
      </div>
      <div className="user-options">
        <Tooltip title="Login">
          <a>
            <LogIn className={`nav-icon ${theme}`} />
          </a>
        </Tooltip>
        <Tooltip title="Logout">
          <a>
            <LogOut className={`nav-icon ${theme}`} />
          </a>
        </Tooltip>
        <Tooltip title="Change the theme">

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
        </Tooltip>
      </div>
    </aside>
  );
};

export default Aside;
