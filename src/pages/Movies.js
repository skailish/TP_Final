import React, { useContext } from "react";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import CardListPreview from "../components/CardListPreview";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import ScrollToTop from "../components/ScrollToTop";

import MovieContext from "../contexts/MovieContext";
import ThemeContext from "../contexts/ThemeContext";

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

//import Button from "../components/primitive/Button";

const Movies = () => {
  const { theme } = useContext(ThemeContext);
  const {
    dataMovieRandom,
    yearMovie,
    voteAverageMovie,
    dataMovie,
    dataMovieTop,
    dataMovieUpcoming,
    dataNowPlaying,
    isLoadingMovie,
  } = useContext(MovieContext);

  return (
    <>
      {(isLoadingMovie ||
        !dataMovieRandom ||
        !yearMovie ||
        !voteAverageMovie ||
        !dataMovie ||
        !dataMovieTop ||
        !dataMovieUpcoming ||
        !dataNowPlaying) && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100px" />
          ) : (
            <BounceLoader css={overrideLight} size="100px" />
          )}
        </Container>
      )}
      {!isLoadingMovie &&
        dataMovieRandom &&
        yearMovie &&
        voteAverageMovie &&
        dataMovie &&
        dataMovieTop &&
        dataMovieUpcoming &&
        dataNowPlaying && (
      <Container className={`main-container ${theme}`}>
            <ScrollToTop />
            <Hero
              data={dataMovieRandom}
              year={yearMovie}
              voteAverage={voteAverageMovie}
              mediatype="movie"
            />

            {/* <Container className={`container-details-movie ${theme}`}></Container> */}
            <CardListPreview
              mediatype="movie"
              data={dataMovie}
              sectionTitle="Trending Movies"
              category="popular"
            />
            <CardListPreview
              mediatype="movie"
              data={dataMovieTop}
              sectionTitle="Top Rated Movies"
              category="top_rated"
            />
            <CardListPreview
              mediatype="movie"
              data={dataMovieUpcoming}
              sectionTitle="Upcoming Movies"
              category="upcoming"
            />
            <CardListPreview
              mediatype="movie"
              data={dataNowPlaying}
              sectionTitle="Now Playing Movies"
              category="now_playing"
            />
          </Container>
        )}
    </>
  );
};

export default Movies;
