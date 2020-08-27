import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { PlayCircle } from "@styled-icons/feather/PlayCircle";

import Votes from "./Votes";
import Container from "./primitive/Container";
import Image from "./primitive/Image";
import Heading from "./primitive/Heading";
import Text from "./primitive/Text";
import Span from "./primitive/Span";
import Button from "./primitive/Button";

import ImageContext from "../contexts/ImageContext";
import ThemeContext from "../contexts/ThemeContext";

const Hero = ({ data, year, voteAverage, mediatype }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const goToInfo = () => {
    history.push(`/${mediatype}/${data.id}/info`);
  };

  return (
    <>
      {data && (
        <Container as="header" className="hero-container">
          <Container className="hero-image-container" id={data.id}>
            {data.backdrop_path && (
              <Image
                className="hero-background-image"
                src={`${imageBaseUrl}${data.backdrop_path}`}
                alt="Movie background image"
              />
            )}
          </Container>
          <Container className="hero-info">
            <Heading className="hero-heading" onClick={goToInfo}>
              {mediatype === "movie" ? data.title : data.name}
            </Heading>
            <Container className="hero-details-container">
              <Votes voteAverage={voteAverage} />
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

            <Link to={`/video/${mediatype}/${data.id}`}>
              <Button className={`button hero-button ${theme}`}>
                <PlayCircle className="play-icon" />
                <Text>Watch Video</Text>
              </Button>
            </Link>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Hero;
