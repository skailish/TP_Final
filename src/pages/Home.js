import React, { useContext } from "react";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import CardListPreview from "../components/CardListPreview";
import MovieContext from "../contexts/MovieContext";

const Home = () => {
  // const { setCategory } = useContext(MovieContext);

  // setCategory("popular");

  return (
    <Container className="main-container">
      <Hero />
      <CardListPreview mediaType="movie" />
      <CardListPreview mediaType="tv" />
    </Container>
  );
};

export default Home;
