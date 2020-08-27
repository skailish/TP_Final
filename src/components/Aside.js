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

import Container from "../components/primitive/Container";

import ThemeContext from "../contexts/ThemeContext";
import SearchContext from "../contexts/SearchContext";

const Aside = ({ user }) => {
  const { theme, handleThemeClick } = useContext(ThemeContext);
  const { handleSearchBarVisibleClick } = useContext(SearchContext);

  const handleLogoutClick = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Container as="aside" className={`aside ${theme}`}>
        <Container className="nav-links">
          <NavLink to="/" activeClassName="selected" exact>
              <Home className={`nav-icon ${theme}`} title={'Home'}/>
          </NavLink>
          <NavLink to="/movie" exact activeClassName="selected">
              <Movie className={`nav-icon ${theme}`} title={'Movie'}/>
          </NavLink>
          <NavLink to="/tv" exact activeClassName="selected">
              <TV className={`nav-icon ${theme}`} title={'Tv Series'}/>
          </NavLink>

            <Search
              className={`nav-icon ${theme}`}
              onClick={() => handleSearchBarVisibleClick()}
              title={'Search'}
            />

          {user && (
            <NavLink to="/favs" exact activeClassName="selected">
                <Heart className={`nav-icon ${theme}`} title={'Favorites'}/>
            </NavLink>
          )}
        </Container>
        <Container className="user-options">
          {user ? (
              <a onClick={handleLogoutClick}>
                <LogOut className={`nav-icon ${theme}`} title={'Logout'} />
              </a>
          ) : (
            <NavLink to="/login" exact activeClassName="selected">
                <LogIn className={`nav-icon ${theme}`} title={'Login'}/>
            </NavLink>
          )}
            {theme === "dark" ? (
              <LightOn
                onClick={() => handleThemeClick(theme)}
                className={ `nav-icon ${theme}` }
                title={'Change the theme'}
              />
            ) : (
              <LightOff
                onClick={() => handleThemeClick(theme)}
                  className={ `nav-icon ${theme}` }
                  title={'Change the theme'}
              />
            )}
        </Container>
      </Container>
    </>
  );
};

export default Aside;
