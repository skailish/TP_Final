import React, { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import ThemeContext from "../contexts/ThemeContext";

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";

import Button from "../components/primitive/Button";

const Movie = () => {
  const { dataMovieRandom, yearMovie, voteAverageMovie } = useContext(
    MovieContext
  );

  const { theme } = useContext(ThemeContext);
  console.log(dataMovieRandom);
  return (
    dataMovieRandom && (
      <Container className="movie-container">
        <Hero
          data={dataMovieRandom}
          year={yearMovie}
          voteAverage={voteAverageMovie}
          mediaType="movie"
        />
        <Container className={`container-details-movie ${theme}`}></Container>

        <Footer />
      </Container>
    )
  );
};

export default Movie;
