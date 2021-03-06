import React, { useEffect, useState, useContext } from "react";
import API_KEY from "../utils/API_KEY";
import {
  useParams,
  Route,
  Switch,
  NavLink,
  useRouteMatch,
} from "react-router-dom";

import useFetch from "../hooks/useFetch";

import { Container, Hero, Nav, ScrollToTop } from "../components";

import { CategorySimilar, Overview, Episodes, Cast } from "../pages";

import ThemeContext from "../contexts/ThemeContext";
import TvShowContext from "../contexts/TvShowContext";

const TVShow = () => {
  const [tvShowID, setTvShowID] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [similarShows, setSimilarShows] = useState([]);
  const [seasons, setSeasons] = useState(0);
  const [castTV, setCastTV] = useState([]);
  const { TVId } = useParams();
  const { path, url } = useRouteMatch();
  const { theme } = useContext(ThemeContext);
  const { seasonNumber } = useContext(TvShowContext);

  const dataJsonTVID = useFetch(
    `https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}`,
    [TVId]
  );

  const dataJsonSimilarShows = useFetch(
    `https://api.themoviedb.org/3/tv/${TVId}/similar?api_key=${API_KEY}&language=en-US&page=1`,
    [TVId]
  );

  const dataCastTv = useFetch(
    `https://api.themoviedb.org/3/tv/${TVId}/credits?api_key=${API_KEY}&language=en-US`,
    [TVId]
  );

  useEffect(() => {
    dataJsonTVID && setTvShowID(dataJsonTVID);
    dataJsonTVID && setVoteAverage(dataJsonTVID.vote_average);
    dataJsonTVID && setYear(dataJsonTVID.first_air_date.split("-")[0]);
    dataJsonTVID && setSeasons(dataJsonTVID.seasons);
    dataJsonSimilarShows && setSimilarShows(dataJsonSimilarShows.results);
    dataCastTv && setCastTV(dataCastTv.cast);
  }, [dataJsonTVID, dataJsonSimilarShows, dataCastTv]);


  return (
    tvShowID && (
      <Container className={`main-container ${theme}`}>
        <ScrollToTop />
        <Hero
          data={tvShowID}
          year={year}
          voteAverage={voteAverage}
          mediatype="tv"
        />
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
              to={`${url}/season/${seasonNumber}`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              EPISODES
            </NavLink>
            {similarShows.length > 0 && (
              <NavLink
                to={`${url}/similar`}
                className={`navlink ${theme}`}
                activeClassName="selected"
              >
                SIMILAR
              </NavLink>
            )}
            <NavLink
              to={`${url}/cast`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              CAST
            </NavLink>
          </Nav>
        </Container>

        <Switch>
          <Route path={`${path}/info`}>
            <Overview data={tvShowID} mediatype="tv" />
          </Route>
          <Route path={`${path}/season/:seasonNumber`}>
            <Episodes seasons={seasons} />
          </Route>
          {similarShows.length > 0 && (
            <Route path={`${path}/similar`}>
              <CategorySimilar data={similarShows} mediatype="tv" />
            </Route>
          )}
          <Route path={`${path}/cast`}>
            <Cast data={castTV} mediatype="tv" />
          </Route>
        </Switch>
      </Container>
    )
  );
};

export default TVShow;
