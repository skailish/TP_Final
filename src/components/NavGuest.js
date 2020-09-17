import React, { useContext, useState } from "react";

import firebase from "../configs/firebase";

import { NavLink } from "react-router-dom";

import { Home } from "@styled-icons/ionicons-solid/Home";
import { Search } from "@styled-icons/bootstrap/Search";
import { Movie2 as Movie } from "@styled-icons/remix-fill/Movie2";
import { Tv as TV } from "@styled-icons/material-twotone/Tv";
import { LogIn } from "@styled-icons/ionicons-sharp/LogIn";
import { Menu } from "@styled-icons/evaicons-solid/Menu";
import { Close } from "@styled-icons/ionicons-solid/Close";
import { Binoculars } from "@styled-icons/boxicons-solid/Binoculars";

import Container from "../components/primitive/Container";
import Link from "../components/primitive/Link";
import Text from "../components/primitive/Text";
import Nav from "../components/primitive/Nav";
import ThemeToggle from "../components/ThemeToggle";

import ThemeContext from "../contexts/ThemeContext";
import SearchContext from "../contexts/SearchContext";

const NavGuest = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { handleSearchBarVisible } = useContext(SearchContext);
  const [noShow, setNoShow] = useState(true);

  const handleToggleNav = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setNoShow(!noShow);
    }
  };

  return (
    <>
      <Nav className={`responsive-nav ${theme}`}>
        <Link
          className="responsive-nav-link"
          onClick={(event) => handleToggleNav(event)}
          onKeyDown={(event) => handleToggleNav(event)}
        >
          <Menu className={`nav-icon ${theme}`} aria-hidden="true" />
        </Link>

        <Link
          className={`responsive-nav-link nav-close-icon ${
            noShow && "set-show-close"
          }`}
          onClick={(event) => handleToggleNav(event)}
          onKeyDown={(event) => handleToggleNav(event)}
        >
          <Close className={`nav-icon ${theme}`} aria-hidden="true" />
        </Link>
      </Nav>
      <Container
        as="nav"
        className={`aside ${theme} ${noShow && "set-show-nav"}`}
      >
        <Container className="nav-links">
          <NavLink
            to="/"
            className="nav-icon-container"
            activeClassName="selected"
            exact
          >
            <Home
              className={`nav-icon ${theme}`}
              title={"Home"}
              onClick={handleToggleNav}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Home</Text>
          </NavLink>
          <NavLink
            to="/movie"
            exact
            className="nav-icon-container"
            activeClassName="selected"
          >
            <Movie
              className={`nav-icon ${theme}`}
              title={"Movie"}
              onClick={handleToggleNav}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Movies</Text>
          </NavLink>
          <NavLink
            to="/tv"
            exact
            className="nav-icon-container"
            activeClassName="selected"
          >
            <TV
              className={`nav-icon ${theme}`}
              title={"Tv Series"}
              onClick={handleToggleNav}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>TV Shows</Text>
          </NavLink>

          <NavLink
            to="/discover"
            exact
            className="nav-icon-container"
            activeClassName="selected"
          >
            <Binoculars
              className={`nav-icon ${theme}`}
              title={"Discover"}
              onClick={handleToggleNav}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Discover</Text>
          </NavLink>

          <Container
            className="nav-icon-container"
            tabIndex="0"
            onClick={(event) => {
              handleSearchBarVisible(event);
              handleToggleNav(event);
            }}
            onKeyDown={(event) => {
              handleSearchBarVisible(event);
              handleToggleNav(event);
            }}
          >
            <Search
              className={`nav-icon ${theme}`}
              title={"Search"}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Search</Text>
          </Container>
        </Container>
        <Container className="user-options">
          <NavLink
            to="/login"
            exact
            className="nav-icon-container"
            activeClassName="selected"
          >
            <LogIn
              className={`nav-icon ${theme}`}
              title={"Login"}
              onClick={handleToggleNav}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Login</Text>
          </NavLink>

          <ThemeToggle
            onClick={(event) => {
              handleTheme(event);
              handleToggleNav(event);
            }}
            onKeyDown={(event) => {
              handleTheme(event);
              handleToggleNav(event);
            }}
          />
        </Container>
      </Container>
    </>
  );
};

export default NavGuest;
