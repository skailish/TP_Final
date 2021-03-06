import React, { useContext, useState } from "react";

import firebase from "../configs/firebase";

import { NavLink } from "react-router-dom";

import { Home } from "@styled-icons/ionicons-solid/Home";
import { Search } from "@styled-icons/bootstrap/Search";
import { Movie2 as Movie } from "@styled-icons/remix-fill/Movie2";
import { Tv as TV } from "@styled-icons/material-twotone/Tv";
import { LogOut } from "@styled-icons/ionicons-sharp/LogOut";
import { Heart } from "@styled-icons/entypo/Heart";
import { Menu } from "@styled-icons/evaicons-solid/Menu";
import { Close } from "@styled-icons/ionicons-solid/Close";
import { Binoculars } from "@styled-icons/boxicons-solid/Binoculars";

import Container from "../components/primitive/Container";
import Link from "../components/primitive/Link";
import Nav from "../components/primitive/Nav";
import Text from "../components/primitive/Text";
import ThemeToggle from "../components/ThemeToggle";
import Modal from "./Modal";

import ThemeContext from "../contexts/ThemeContext";
import SearchContext from "../contexts/SearchContext";

const NavAuth = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { handleSearchBarVisible } = useContext(SearchContext);
  const [noShow, setNoShow] = useState(true);
  const [modal, setModal] = useState(false);

  const handleLogout = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setModal(true);

      setTimeout(() => firebase.auth().signOut(), 1000);
      setTimeout(() => setModal(false), 1000);
    }
  };

  const handleToggleNav = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setNoShow(!noShow);
    }
  };
  return (
    <>
      {modal && <Modal text="You have logged off successfully!" />}
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

          <NavLink
            to="/favs"
            exact
            className="nav-icon-container"
            activeClassName="selected"
          >
            <Heart
              className={`nav-icon ${theme}`}
              title={"Favorites"}
              onClick={handleToggleNav}
              title={"Favs"}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Favs</Text>
          </NavLink>
        </Container>
        <Container className="user-options">
          <Link
            onClick={(event) => {
              handleLogout(event);
              handleToggleNav(event);
            }}
            onKeyDown={(event) => {
              handleLogout(event);
              handleToggleNav(event);
            }}
            className="nav-icon-container"
          >
            <LogOut
              className={`nav-icon ${theme}`}
              title={"Logout"}
              aria-hidden="true"
            />
            <Text className={`nav-text ${theme}`}>Logout</Text>
          </Link>

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

export default NavAuth;
