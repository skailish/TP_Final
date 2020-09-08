import React, { useContext } from "react";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import { CardListPreview, Hero, Container, ScrollToTop } from "../components";

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
    movieRandom,
    yearMovie,
    voteAverageMovie,
    movie,
    movieTop,
    movieUpcoming,
    nowPlaying,
    isLoadingMovie,
  } = useContext(MovieContext);

  return (
    <>
      {(isLoadingMovie ||
        !movieRandom ||
        !yearMovie ||
        !voteAverageMovie ||
        !movie ||
        !movieTop ||
        !movieUpcoming ||
        !nowPlaying) && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100px" />
          ) : (
            <BounceLoader css={overrideLight} size="100px" />
          )}
        </Container>
      )}
      {!isLoadingMovie &&
        movieRandom &&
        yearMovie &&
        voteAverageMovie &&
        movie &&
        movieTop &&
        movieUpcoming &&
        nowPlaying && (
          <Container className={`main-container ${theme}`}>
            <ScrollToTop />
            <Hero
              data={movieRandom}
              year={yearMovie}
              voteAverage={voteAverageMovie}
              mediatype="movie"
            />

            {/* <Container className={`container-details-movie ${theme}`}></Container> */}
            <CardListPreview
              mediatype="movie"
              data={movie}
              sectionTitle="Trending Movies"
              category="popular"
            />
            <CardListPreview
              mediatype="movie"
              data={movieTop}
              sectionTitle="Top Rated Movies"
              category="top_rated"
            />
            <CardListPreview
              mediatype="movie"
              data={movieUpcoming}
              sectionTitle="Upcoming Movies"
              category="upcoming"
            />
            <CardListPreview
              mediatype="movie"
              data={nowPlaying}
              sectionTitle="Now Playing Movies"
              category="now_playing"
            />
          </Container>
        )}
    </>
  );
};

export default Movies;
