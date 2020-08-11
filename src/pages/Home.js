import React, { useContext } from "react";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import CardListPreview from "../components/CardListPreview";
import DataContext from "../contexts/DataContext";
import MovieContext from "../contexts/MovieContext";
import TvShowContext from "../contexts/TvShowContext";

const Home = () => {
  // const { setCategory } = useContext(MovieContext);

  // setCategory("popular");

  const { data, year, voteAverage, mediaType } = useContext(DataContext);
  const { dataMovie } = useContext(MovieContext);
  const { dataTvShow } = useContext(TvShowContext);

  return (
    <Container className="main-container">
      <Hero
        data={data}
        year={year}
        voteAverage={voteAverage}
        mediaType={mediaType}
      />
      <CardListPreview
        mediaType="movie"
        data={dataMovie}
        sectionTitle="Trending Movies"
        category="popular"
      />
      <CardListPreview
        mediaType="tv"
        data={dataTvShow}
        sectionTitle="Trending TV Shows"
        category="popular"
      />
    </Container>
  );
};

export default Home;
