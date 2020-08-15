import React, { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import ThemeContext from "../contexts/ThemeContext";
import CardListPreview from "../components/CardListPreview";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

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
      {isLoadingMovie && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
      {!isLoadingMovie && (
        <Container className="main-container">
          {console.log(dataMovieTop)}
          <Hero
            data={dataMovieRandom}
            year={yearMovie}
            voteAverage={voteAverageMovie}
            mediaType="movie"
          />

          {/* <Container className={`container-details-movie ${theme}`}></Container> */}
          <CardListPreview
            mediaType="movie"
            data={dataMovie}
            sectionTitle="Trending Movies"
            category="popular"
          />
          <CardListPreview
            mediaType="movie"
            data={dataMovieTop}
            sectionTitle="Top Rated Movies"
            category="top_rated"
          />
          <CardListPreview
            mediaType="movie"
            data={dataMovieUpcoming}
            sectionTitle="Upcoming Movies"
            category="upcoming"
          />
          <CardListPreview
            mediaType="movie"
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
