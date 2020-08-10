import React from "react";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import CardListPreview from "../components/CardListPreview";

const Home = () => {
  return (
    <Container className="main-container">
      <Hero />
      {/* <CardListPreview /> */}
    </Container>
  );
};

export default Home;
