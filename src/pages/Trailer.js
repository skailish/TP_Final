import React, { useEffect, useState, useContext } from "react";
import API_KEY from "../utils/API_KEY";
import { useParams, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import { Container, Heading, Image, GoBackButton } from "../components";

import img from "../images/Error.png";

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

const Trailer = () => {
  const [url, setUrl] = useState([]);
  const { media, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  useEffect(() => {
    const getVideo = async () => {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const dataJson = await response.json();

      const getKey = await dataJson.results.filter((i) => i.type === "Trailer");

      setUrl(getKey);
      setIsError(getKey.length === 0);
      setIsLoading(false);
    };
    getVideo();
  }, []);

  return (
    <>
      <GoBackButton />
      {isLoading && url.length === 0 && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100px" />
          ) : (
            <BounceLoader css={overrideLight} size="100px" />
          )}
        </Container>
      )}
      {!isLoading && isError && (
        <Container className={`main-error-container ${theme}`}>
          <Image src={img} className="error-img" />
          <Heading className={`${theme}`} id="error-trailer-heading" level={1}>
            ...Ups, this {media === "movie" ? media : "TV show"} doesn't have a
            trailer.
          </Heading>
        </Container>
      )}
      {!isLoading && !isError && (
        <Container className={`main-trailer-container ${theme}`}>
          <Container className="player-container">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${url[0].key}`}
              width="100%"
              height="100%"
              controls
              onReady
              volume="0.5"
            />
          </Container>
        </Container>
      )}
    </>
  );
};

export default Trailer;
