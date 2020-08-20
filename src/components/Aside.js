import React, { useContext } from "react";
import firebase from "../configs/firebase";
import { NavLink } from "react-router-dom";
import { Home } from "@styled-icons/ionicons-solid/Home";
import { Search } from "@styled-icons/bootstrap/Search";
import { Movie2 as Movie } from "@styled-icons/remix-fill/Movie2";
import { Tv as TV } from "@styled-icons/material-twotone/Tv";
import { LogIn } from "@styled-icons/ionicons-sharp/LogIn";
import { LogOut } from "@styled-icons/ionicons-sharp/LogOut";
import { LightbulbFlash as LightOn } from "@styled-icons/remix-fill/LightbulbFlash";
import { LightbulbFlash as LightOff } from "@styled-icons/remix-line/LightbulbFlash";
import { Heart } from "@styled-icons/entypo/Heart";
import Tooltip from "./Tooltip";
import ThemeContext from "../contexts/ThemeContext";
//import UserContext from "../contexts/UserContext";

const Aside = ({ user }) => {
  const { theme, handleThemeClick } = useContext(ThemeContext);
  //const { user } = useContext(UserContext);

  const handleLogoutClick = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      {user && (
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

            <NavLink to="/favs" exact activeClassName="selected">
              <Tooltip title="Favorites">
                <Heart className={`nav-icon ${theme}`} />
              </Tooltip>
            </NavLink>
          </div>
          <div className="user-options">
            <Tooltip title="Logout">
              <a onClick={handleLogoutClick}>
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
      )}
      {!user && (
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
            <NavLink to="/login" exact activeClassName="selected">
              <Tooltip title="Login">
                <LogIn className={`nav-icon ${theme}`} />
              </Tooltip>
            </NavLink>

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
      )}
    </>
  );
};

export default Aside;
