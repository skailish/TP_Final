import React, { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import ThemeContext from "../contexts/ThemeContext";
import CardListPreview from "../components/CardListPreview";

//import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";

//import Button from "../components/primitive/Button";

const Movies = () => {
  const {
    dataMovieRandom,
    yearMovie,
    voteAverageMovie,
    dataMovie,
    dataMovieTop,
    dataMovieUpcoming,
    dataNowPlaying,
  } = useContext(MovieContext);

  return (
    dataMovieRandom && (
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
    )
  );
};

export default Movies;
