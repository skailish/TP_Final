import React, { useEffect, useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import Card from "../components/Card";
import MovieContext from "../contexts/MovieContext";
import TvShowContext from "../contexts/MovieContext";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";
import ScrollToTop from "../components/ScrollToTop";
import FavsContext from "../contexts/FavsContext";

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

const Favs = ({ user }) => {
  const {
    moviesArray,
    seriesArray,
    updateSeriesFavs,
    updateMovieFavs,
  } = useContext(FavsContext);
  const { theme } = useContext(ThemeContext);
  const { isLoadingMovie } = useContext(MovieContext);
  const { isLoadingTvShow } = useContext(TvShowContext);

  useEffect(() => {
    updateSeriesFavs(user);
    updateMovieFavs(user);
  }, [user]);

  return (
    <>
      {moviesArray.length <= 0 && seriesArray.length <= 0 && (
        <Container className={`nofavs-container ${theme}`}>
          <Heading className={`nofavs-heading ${theme}`}>
            You have no favorites yet, go select some...
          </Heading>
        </Container>
      )}

      {(isLoadingMovie || isLoadingTvShow) && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100px" />
          ) : (
            <BounceLoader css={overrideLight} size="100px" />
          )}
        </Container>
      )}
      {!isLoadingMovie &&
        !isLoadingTvShow &&
        (moviesArray.length > 0 || seriesArray.length > 0) && (
          <Container className={`main-favs-container ${theme}`}>
            <ScrollToTop />
            <Heading level={1} className={`favs-heading ${theme}`}>
              Your Favorites
            </Heading>
            <Container>
              {moviesArray.length > 0 && (
                <Heading level={2} className={`favs-subheading ${theme}`}>
                  Your Movies
                </Heading>
              )}
              <Container className={`favs-cards-container ${theme}`}>
                {moviesArray.map((fav) => (
                  <Card
                    key={fav.id}
                    id={fav.id}
                    src={fav.src}
                    title={fav.title}
                    votes={fav.votes}
                    mediatype={fav.mediatype}
                    like={true}
                  />
                ))}
              </Container>
              <Container>
                {seriesArray.length > 0 && (
                  <Heading level={2} className={`favs-subheading ${theme}`}>
                    Your Series
                  </Heading>
                )}

                <Container className={`favs-cards-container ${theme}`}>
                  {seriesArray.map((fav) => (
                    <Card
                      key={fav.id}
                      id={fav.id}
                      src={fav.src}
                      title={fav.title}
                      votes={fav.votes}
                      mediatype={fav.mediatype}
                      like={true}
                    />
                  ))}
                </Container>
              </Container>
            </Container>
          </Container>
        )}
    </>
  );
};

export default Favs;
