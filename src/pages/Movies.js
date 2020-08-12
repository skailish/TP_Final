import React, { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import ThemeContext from "../contexts/ThemeContext";

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";

import Button from "../components/primitive/Button";

const Movies = () => {
  const { dataMovieRandom, yearMovie, voteAverageMovie } = useContext(
    MovieContext
  );

  const { theme } = useContext(ThemeContext);
  console.log(dataMovieRandom);
  return (
    dataMovieRandom && (
      <Container className="movies-container">
        <Hero
          data={dataMovieRandom}
          year={yearMovie}
          voteAverage={voteAverageMovie}
          mediaType="movie"
        />
        <Container className={`container-details-movies ${theme}`}></Container>

        <Footer />
      </Container>
    )
  );
};

export default Movies;
