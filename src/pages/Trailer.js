import React, { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import Image from "../components/primitive/Image";
import img from "../images/Error.png";
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

const Trailer = () => {
  const [url, setUrl] = useState(0);
  const { media, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getVideo = async () => {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();

      const getKey = (arr) => {
        for (const i of arr) {
          if (i.type === "Trailer") {
            const key = i.key;
            return key;
          }
        }
      };
      setUrl(getKey(dataJson.results));
      setIsError(getKey(dataJson.results) === undefined);
      setIsLoading(false);
    };
    getVideo();
  }, []);

  return (
    <>
      {isLoading && !url && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
      {!isLoading && isError && (
        <Container className={`main-error-container ${theme}`}>
          <Image src={img} className="error-img" />
          <Heading classname={`${theme}`} id="error-trailer-heading" level={1}>
            ...Ups, this {media === "movie" ? media : "TV show"} doesn´t have a trailer.
          </Heading>
        </Container>
      )}
        {!isLoading && !isError && (
        <Container className={`main-trailer-container ${theme}`}>
          <Container className="player-container">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${url}`}
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
