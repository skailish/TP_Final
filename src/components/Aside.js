import React, { useContext, useState } from "react";

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
import { Menu } from "@styled-icons/evaicons-solid/Menu";
import { Close } from "@styled-icons/ionicons-solid/Close";

import Container from "../components/primitive/Container";
import Link from "../components/primitive/Link";
import Nav from "../components/primitive/Nav";

import ThemeContext from "../contexts/ThemeContext";
import SearchContext from "../contexts/SearchContext";

const Aside = ({ user }) => {
  const { theme, handleThemeClick } = useContext(ThemeContext);
  const { handleSearchBarVisibleClick } = useContext(SearchContext);
  const [noShow, setNoShow] = useState(true);

  const handleLogoutClick = () => {
    firebase.auth().signOut();
  };

  const handleToggleNavClick = () => {
    setNoShow(!noShow);
  };

  return (
    <>
      <Nav className={`responsive-nav ${theme}`}>
        <Link className="responsive-nav-link" onClick={handleToggleNavClick}>
          <Menu className={`nav-icon ${theme}`} />
        </Link>

        <Link
          className={`responsive-nav-link nav-close-icon ${
            noShow && "set-show-close"
          }`}
          onClick={handleToggleNavClick}
        >
          <Close className={`nav-icon ${theme}`} />
        </Link>
      </Nav>
      <Container
        as="aside"
        className={`aside ${theme} ${noShow && "set-show-nav"}`}
      >
        <Container className="nav-links">
          <NavLink to="/" activeClassName="selected" exact>
            <Home
              className={`nav-icon ${theme}`}
              title={"Home"}
              onClick={handleToggleNavClick}
            />
          </NavLink>
          <NavLink to="/movie" exact activeClassName="selected">
            <Movie
              className={`nav-icon ${theme}`}
              title={"Movie"}
              onClick={handleToggleNavClick}
            />
          </NavLink>
          <NavLink to="/tv" exact activeClassName="selected">
            <TV
              className={`nav-icon ${theme}`}
              title={"Tv Series"}
              onClick={handleToggleNavClick}
            />
          </NavLink>

          <Search
            className={`nav-icon ${theme}`}
            onClick={() => {
              handleSearchBarVisibleClick();
              handleToggleNavClick();
            }}
            title={"Search"}
          />

          {user && (
            <NavLink to="/favs" exact activeClassName="selected">
              <Heart
                className={`nav-icon ${theme}`}
                title={"Favorites"}
                onClick={handleToggleNavClick}
              />
            </NavLink>
          )}
        </Container>
        <Container className="user-options">
          {user ? (
            <a onClick={handleLogoutClick}>
              <LogOut
                className={`nav-icon ${theme}`}
                title={"Logout"}
                onClick={handleToggleNavClick}
              />
            </a>
          ) : (
            <NavLink to="/login" exact activeClassName="selected">
              <LogIn
                className={`nav-icon ${theme}`}
                title={"Login"}
                onClick={handleToggleNavClick}
              />
            </NavLink>
          )}
          {theme === "dark" ? (
            <LightOn
              onClick={() => handleThemeClick(theme)}
              className={`nav-icon ${theme}`}
              title={"Change the theme"}
            />
          ) : (
            <LightOff
              onClick={() => handleThemeClick(theme)}
              className={`nav-icon ${theme}`}
              title={"Change the theme"}
            />
          )}
        </Container>
      </Container>
    </>
  );
};

export default Aside;
