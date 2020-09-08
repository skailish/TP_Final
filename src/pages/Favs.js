import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import {
  Container,
  Heading,
  ScrollToTop,
  CardListPreview,
} from "../components";

import ThemeContext from "../contexts/ThemeContext";
import MovieContext from "../contexts/MovieContext";
import TvShowContext from "../contexts/MovieContext";
import FavsContext from "../contexts/FavsContext";
import UserContext from "../contexts/UserContext";

const overrideDark = css`
  & div {
    background-color: #3fbac2;
  }
`;

const overrideLight = css`
  & div {
    background-color: #992e2e;
  }
`;

const Favs = () => {
  const {
    moviesArray,
    seriesArray,
    updateSeriesFavs,
    updateMovieFavs,
  } = useContext(FavsContext);
  const { theme } = useContext(ThemeContext);
  const { isLoadingMovie } = useContext(MovieContext);
  const { isLoadingTvShow } = useContext(TvShowContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    updateSeriesFavs(user);
    updateMovieFavs(user);
  }, [user]);

  return (
    <>
      {!user ? (
        <Redirect to="" />
      ) : (
        <>
          {(isLoadingMovie || isLoadingTvShow) &&
            !moviesArray &&
            !seriesArray && (
              <Container className={`onLoading-Container ${theme}`}>
                {theme === "dark" ? (
                  <BounceLoader css={overrideDark} size="100px" />
                ) : (
                  <BounceLoader css={overrideLight} size="100px" />
                )}
              </Container>
            )}
          {moviesArray.length <= 0 && seriesArray.length <= 0 && (
            <Container className={`nofavs-container ${theme}`}>
              <Heading className={`nofavs-heading ${theme}`}>
                You have no favorites yet, go select some...
              </Heading>
            </Container>
          )}

          {!isLoadingMovie &&
            !isLoadingTvShow &&
            (moviesArray.length > 0 || seriesArray.length > 0) && (
              <Container className={`main-favs-container ${theme}`}>
                <ScrollToTop />
                <Heading level={1} className={`favs-heading ${theme}`}>
                  Your Favorites
                </Heading>
                <Container className={`favs-carousel-container ${theme}`}>
                  {moviesArray.length > 0 && (
                    <CardListPreview
                      mediatype="movie"
                      data={moviesArray}
                      sectionTitle="Your Favorites Movies"
                      isFavs={false}
                    />
                  )}
                  {seriesArray.length > 0 && (
                    <CardListPreview
                      mediatype="tv"
                      data={seriesArray}
                      sectionTitle="Your Favorites Tv Shows"
                      isFavs={false}
                    />
                  )}
                </Container>
              </Container>
            )}
        </>
      )}
    </>
  );
};

export default Favs;
