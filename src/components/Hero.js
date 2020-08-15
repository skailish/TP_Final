import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ImageContext from "../contexts/ImageContext";
import ThemeContext from "../contexts/ThemeContext";
import Rating from "./Rating";
import Container from "./primitive/Container";
import Image from "./primitive/Image";
import Heading from "./primitive/Heading";
import Text from "./primitive/Text";
import Span from "./primitive/Span";
import { PlayCircle } from "@styled-icons/feather/PlayCircle";
import Button from "./primitive/Button";
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


const Hero = ({ data, year, voteAverage, mediaType, isLoading }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const { theme } = useContext(ThemeContext);


  return (<>
    {isLoading && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
    
    {!isLoading && (
        <Container as="header" className="hero-container">
          <Container className="hero-image-container" id={data.id}>
            <Image
              className="hero-background-image"
              src={`${imageBaseUrl}${data.backdrop_path}`}
              alt="Movie background image"
            />
          </Container>
          <Container className="hero-info">
            <Heading>{mediaType === "movie" ? data.title : data.name}</Heading>

            <Container className="hero-details-container">
              <Rating voteAverage={voteAverage} />
              <Span className="hero-details">
                <Text>{data.vote_count}</Text> <Text>Reviews</Text>
              </Span>
              {year && (
                <Span className="hero-details">
                  <Text>{year}</Text>
                </Span>
              )}
              <Span className="hero-details">
                <Text>Popularity:</Text> <Text>{data.popularity}</Text>
              </Span>
            </Container>

            <Text className="hero-description">{data.overview}</Text>

            <Link to={`/video/${mediaType}/${data.id}`}>
              <Button className={`button hero-button ${theme}`}>
                <PlayCircle className="play-icon" />
                <Text>Watch Video</Text>
              </Button>
            </Link>
          </Container>
        </Container>)}
      </>
    );
};

export default Hero;
