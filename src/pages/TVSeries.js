import React, { useContext } from "react";
import TvShowContext from "../contexts/TvShowContext";
import CardListPreview from "../components/CardListPreview";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import ThemeContext from "../contexts/ThemeContext";
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

const TVSeries = () => {
  const { theme } = useContext(ThemeContext);
  const {
    dataTodayTv,
    dataCurrentTv,
    dataTvTop,
    dataTvShowRandom,
    dataTvShow,
    voteAverage,
    year,
    isLoadingTvShow
  } = useContext(TvShowContext);
  return (
    <>
       {isLoadingTvShow && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
    {!isLoadingTvShow && (
      <Container className="main-container">
        <Hero
          data={dataTvShowRandom}
          year={year}
          voteAverage={voteAverage}
          mediatype="tv"
        />
        <CardListPreview
          mediatype="tv"
          data={dataTvShow}
          sectionTitle="Popular TV Shows"
          category="popular"
        />

        <CardListPreview
          mediatype="tv"
          data={dataTvTop}
          sectionTitle="Top Rated TV Shows"
          category="top_rated"
        />
        <CardListPreview
          mediatype="tv"
          data={dataCurrentTv}
          sectionTitle="Currently Airing TV Shows"
          category="on_the_air"
        />
        <CardListPreview
          mediatype="tv"
          data={dataTodayTv}
          sectionTitle="TV Shows Airing Today"
          category="airing_today"
        />
      </Container>
    )}
    </>
  );
};

export default TVSeries;
