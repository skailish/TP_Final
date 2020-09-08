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
    dataTodayTv,
    dataCurrentTv,
    dataTvTop,
    dataTvShowRandom,
    dataTvShow,
    voteAverage,
    year,
    isLoadingTvShow,
  } = useContext(TvShowContext);
  return (
    <>
      {(isLoadingTvShow ||
        !dataTvShowRandom ||
        !dataTodayTv ||
        !dataCurrentTv ||
        !dataTvTop ||
        !dataTvShow ||
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
        dataTvShowRandom &&
        dataTodayTv &&
        dataCurrentTv &&
        dataTvTop &&
        dataTvShow &&
        voteAverage &&
        year && (
          <Container className={`main-container ${theme}`}>
            <ScrollToTop />
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
      {console.log(
        !isLoadingTvShow &&
          dataTvShowRandom &&
          dataTodayTv &&
          dataCurrentTv &&
          dataTvTop &&
          dataTvShow &&
          voteAverage &&
          year !== 0 && (
            <Container className={`main-container ${theme}`}>
              <ScrollToTop />
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
          )
      )}
    </>
  );
};

export default TVSeries;
