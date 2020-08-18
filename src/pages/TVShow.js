import React, { useEffect, useState, useContext } from "react";
import {
  useParams,
  Route,
  Switch,
  NavLink,
  useRouteMatch,
} from "react-router-dom";

import Container from "../components/primitive/Container";
import Hero from "../components/Hero";
import CardListPreview from "../components/CardListPreview";
import Nav from "../components/primitive/Nav";
import ScrollToTop from "../components/ScrollToTop";

import Overview from "./details/Overview";
import CategorySimilar from "./categories/CategorySimilar";
import Episodes from "./details/Episodes";

import ThemeContext from "../contexts/ThemeContext";

const TVShow = () => {
  const [dataTVShowID, setDataTVShowID] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [similarShows, setSimilarShows] = useState([]);
  const [seasons, setSeasons] = useState(0);

  const { TVId } = useParams();
  const { path, url } = useRouteMatch();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getTVShowID = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${TVId}?api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataTVShowID(dataJson);
      setVoteAverage(dataJson.vote_average);
      setYear(dataJson.first_air_date.split("-")[0]);
      setSeasons(dataJson.seasons);
    };
    getTVShowID();
  }, [TVId]);

  useEffect(() => {
    // const pageRandom = Math.floor(Math.random() * 100) + 1;
    const getSimilarShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${TVId}/similar?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setSimilarShows(dataJson.results);
    };
    getSimilarShows();
  }, [TVId]);

  return (
    dataTVShowID && (
      <Container className="main-container">
        <ScrollToTop />
        <Hero
          data={dataTVShowID}
          year={year}
          voteAverage={voteAverage}
          mediaType="tv"
        ></Hero>
        <Container className={`nav-container ${theme}`}>
          {" "}
          <Nav className={`nav-tvShow ${theme}`}>
            <NavLink
              to={`${url}/info`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              OVERVIEW
            </NavLink>
            <NavLink
              to={`${url}/season/seasonNumber`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              EPISODES
            </NavLink>
            <NavLink
              to={`${url}/similar`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              SIMILAR
            </NavLink>
          </Nav>
        </Container>

        <Switch>
          <Route path={`${path}/info`}>
            <Overview data={dataTVShowID} mediatype="tv" />
          </Route>
          <Route path={`${path}/season/:seasonNumber`}>
            <Episodes seasons={seasons} />
          </Route>
          <Route path={`${path}/similar`}>
            <CategorySimilar data={similarShows} mediatype="tv" />
          </Route>
        </Switch>
      </Container>
    )
  );
};

export default TVShow;
