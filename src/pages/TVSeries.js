import React, { useContext } from "react";
import TvShowContext from "../contexts/TvShowContext";
import CardListPreview from "../components/CardListPreview";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";

const TVSeries = () => {
  const {
    dataTodayTv,
    dataCurrentTv,
    dataTvTop,
    dataTvShowRandom,
    dataTvShow,
    voteAverage,
    year,
  } = useContext(TvShowContext);
  return (
    <Container className="main-container">
      <Hero
        data={dataTvShowRandom}
        year={year}
        voteAverage={voteAverage}
        mediaType="tv"
      />
      <CardListPreview
        mediaType="tv"
        data={dataTvShow}
        sectionTitle="Popular TV Shows"
        category="popular"
      />

      <CardListPreview
        mediaType="tv"
        data={dataTvTop}
        sectionTitle="Top Rated TV Shows"
        category="top_rated"
      />
      <CardListPreview
        mediaType="tv"
        data={dataCurrentTv}
        sectionTitle="Currently Airing TV Shows"
        category="on_the_air"
      />
      <CardListPreview
        mediaType="tv"
        data={dataTodayTv}
        sectionTitle="TV Shows Airing Today"
        category="airing_today"
      />
    </Container>
  );
};

export default TVSeries;
