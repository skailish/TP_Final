import React, { useEffect, useState, useContext } from "react";
import API_KEY from "../utils/API_KEY";
import {
  useParams,
  NavLink,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

import Container from "../components/primitive/Container";
import Hero from "../components/Hero";
import Nav from "../components/primitive/Nav";

import CategorySimilar from "./categories/CategorySimilar";
import Overview from "../pages/details/Overview";
import Cast from "../pages/details/Cast";

import ThemeContext from "../contexts/ThemeContext";

const Movie = () => {
  const [dataMovieID, setDataMovieID] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getMovieId = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const dataJson = await response.json();
      setDataMovieID(dataJson);
      setVoteAverage(dataJson.vote_average);
      setYear(dataJson.release_date.split("-")[0]);
    };
    getMovieId();
  }, [movieId]);

  useEffect(() => {
    const getSimilarMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setSimilarMovies(dataJson.results);
    };
    getSimilarMovies();
  }, [movieId]);

  useEffect(() => {
    const getMovieCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      const dataJson = await response.json();
      setMovieCast(dataJson.cast);
    };
    getMovieCast();
  }, [movieId]);

  return (
    dataMovieID && (
      <Container className={`main-container ${theme}`}>
        <Hero
          data={dataMovieID}
          year={year}
          voteAverage={voteAverage}
          mediatype="movie"
        />
        <Container className={`nav-container ${theme}`}>
          <Nav className={`nav-tvShow ${theme}`}>
            <NavLink
              to={`${url}/info`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              OVERVIEW
            </NavLink>
            <NavLink
              to={`${url}/cast`}
              className={`navlink ${theme}`}
              activeClassName="selected"
            >
              CAST
            </NavLink>
            {similarMovies.length > 0 && (
              <NavLink
                to={`${url}/similar`}
                className={`navlink ${theme}`}
                activeClassName="selected"
              >
                SIMILAR
              </NavLink>
            )}
          </Nav>
        </Container>
        <Switch>
          <Route path={`${path}/info`}>
            <Overview data={dataMovieID} mediatype="movie" />
          </Route>
          <Route path={`${path}/cast`}>
            <Cast data={movieCast} mediatype="movie" />
          </Route>
          {similarMovies.length > 0 && (
            <Route path={`${path}/similar`}>
              <CategorySimilar data={similarMovies} mediatype="movie" />
            </Route>
          )}
        </Switch>
      </Container>
    )
  );
};

export default Movie;
