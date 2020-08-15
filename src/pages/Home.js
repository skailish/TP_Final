import React, { useContext } from "react";
import Hero from "../components/Hero";
import Container from "../components/primitive/Container";
import CardListPreview from "../components/CardListPreview";
import DataContext from "../contexts/DataContext";
import MovieContext from "../contexts/MovieContext";
import TvShowContext from "../contexts/TvShowContext";
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

const Home = () => {
  // const { setCategory } = useContext(MovieContext);

  // setCategory("popular");
  const { theme } = useContext(ThemeContext);
  const { data, year, voteAverage, mediaType, isLoading } = useContext(
    DataContext
  );
  const { dataMovie, isLoadingMovie } = useContext(MovieContext);
  const { dataTvShow, isLoadingTvShow } = useContext(TvShowContext);

  return (
    <>
      {(isLoading || isLoadingMovie || isLoadingTvShow) && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
      {(!isLoading && !isLoadingMovie && !isLoadingTvShow) &&
      <Container className="main-container">
        <Hero
          data={data}
          year={year}
          voteAverage={voteAverage}
          mediaType={mediaType}
          // onLoading={isLoading}
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
      </Container>}
    </>
  );
};

export default Home;
