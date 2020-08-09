import React from "react";
import { NavLink } from "react-router-dom";
import { Home } from "@styled-icons/ionicons-solid/Home";
import { Search } from "@styled-icons/bootstrap/Search";
import { Movie2 as Movie } from "@styled-icons/remix-fill/Movie2";
import { Tv as TV } from "@styled-icons/material-twotone/Tv";
import { LogIn } from "@styled-icons/ionicons-sharp/LogIn";
import { LogOut } from "@styled-icons/ionicons-sharp/LogOut";
import { LightbulbFlash as LightOn } from "@styled-icons/remix-fill/LightbulbFlash";
import { LightbulbFlash as LightOff } from "@styled-icons/remix-line/LightbulbFlash";
import styled from "styled-components";

const Aside = () => {
  return (
    <aside className="aside">
      <div className="nav-links">
        <NavLink to="/" activeClassName="selected" exact>
          <Home className="nav-icon" />
        </NavLink>
        <NavLink to="/Movie" exact activeClassName="selected">
          <Movie className="nav-icon" />
        </NavLink>
        <NavLink to="/TV" exact activeClassName="selected">
          <TV className="nav-icon" />
        </NavLink>
        <Search className="nav-icon" />
      </div>
      <div className="user-options">
        <a>
          <LogIn className="nav-icon" />
        </a>
        <a>
          <LogOut className="nav-icon" />
        </a>
        <LightOn className="nav-icon" />
        <LightOff className="nav-icon" />
      </div>
    </aside>
  );
};

export default Aside;
