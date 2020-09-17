import React, { useContext } from "react";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import { CardListPreview, Hero, Container, ScrollToTop } from "../components";

import TvShowContext from "../contexts/TvShowContext";
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

const TVSeries = () => {
  const { theme } = useContext(ThemeContext);
  const {
    todayTv,
    currentTv,
    tvTop,
    tvShowRandom,
    tvShow,
    voteAverage,
    year,
    isLoadingTvShow,
  } = useContext(TvShowContext);
  return (
    <>
      {(isLoadingTvShow ||
        !tvShowRandom ||
        !todayTv ||
        !currentTv ||
        !tvTop ||
        !tvShow ||
        !voteAverage ||
        !year) && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
      {!isLoadingTvShow &&
        tvShowRandom &&
        todayTv &&
        currentTv &&
        tvTop &&
        tvShow &&
        voteAverage &&
        year && (
          <Container className={`main-container ${theme}`}>
            <ScrollToTop />
            <Hero
              data={tvShowRandom}
              year={year}
              voteAverage={voteAverage}
              mediatype="tv"
            />
            <CardListPreview
              mediatype="tv"
              data={tvShow}
              sectionTitle="Popular TV Shows"
              category="popular"
              isFavs={false}
            />

            <CardListPreview
              mediatype="tv"
              data={tvTop}
              sectionTitle="Top Rated TV Shows"
              category="top_rated"
              isFavs={false}
            />
            <CardListPreview
              mediatype="tv"
              data={currentTv}
              sectionTitle="Currently Airing TV Shows"
              category="on_the_air"
              isFavs={false}
            />
            <CardListPreview
              mediatype="tv"
              data={todayTv}
              sectionTitle="TV Shows Airing Today"
              category="airing_today"
              isFavs={false}
            />
          </Container>
        )}
    </>
  );
};

export default TVSeries;
