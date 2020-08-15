import React, { useEffect, useState } from "react";
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

import Overview from "./details/Overview";

const TVShow = () => {
  const [dataTVShowID, setDataTVShowID] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [similarShows, setSimilarShows] = useState([]);

  const { TVId } = useParams();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const getTVShowID = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${TVId}?api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataTVShowID(dataJson);
      setYear(dataJson.first_air_date.split("-")[0]);
      setVoteAverage(dataJson.vote_average);
    };
    getTVShowID();
  }, []);

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
  }, []);

  return (
    dataTVShowID && (
      <Container className="main-container">
        <Hero
          data={dataTVShowID}
          year={year}
          voteAverage={voteAverage}
          mediaType="tv"
        ></Hero>
        <Nav className="nav-tvShow">
          <NavLink
            to={`${url}/info`}
            className="navlink"
            activeClassName="selected"
          >
            OVERVIEW
          </NavLink>
          <NavLink
            to={`${url}/season/seasonNumber`}
            className="navlink"
            activeClassName="selected"
          >
            EPISODES
          </NavLink>
          <NavLink
            to={`${url}/similar`}
            className="navlink"
            activeClassName="selected"
          >
            SIMILAR
          </NavLink>
        </Nav>
        <Switch>
          <Route path={`${path}/info`}>
            <Overview data={dataTVShowID} />
          </Route>
          <Route path={`${path}/season/seasonNumber`}></Route>
          <Route path={`${path}/similar`}></Route>
        </Switch>

        <CardListPreview
          mediaType="tv"
          data={similarShows}
          sectionTitle="More Like This"
          category="similar"
        ></CardListPreview>
      </Container>
    )
  );
};

export default TVShow;
