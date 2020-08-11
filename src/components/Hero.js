import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ImageContext from "../contexts/ImageContext";

import Rating from "./Rating";
import Container from "./primitive/Container";
import Image from "./primitive/Image";
import Heading from "./primitive/Heading";
import Text from "./primitive/Text";
import Span from "./primitive/Span";
import Button from "./primitive/Button";

const Hero = ({ data, year, voteAverage }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();

  const handleGoToClick = (mediaType, id) => {
    history.push(`/${mediaType}/${id}`);
  };

  return (
    data && (
      <>
        <Container as="header" className="hero-container">
          <Container
            className="hero-image-container"
            id={data[0] && data[0].id}
          >
            <Image
              className="hero-background-image"
              src={`${imageBaseUrl}${data[0] && data[0].backdrop_path}`}
              alt="Movie background image"
            />
          </Container>
          <Container className="hero-info">
            <Heading>{data[0] && data[0].title}</Heading>

            <Container className="hero-details-container">
              <Rating voteAverage={voteAverage} />
              <Span className="hero-details">
                <Text>{data[0] && data[0].vote_count}</Text>{" "}
                <Text>Reviews</Text>
              </Span>
              {year && (
                <Span className="hero-details">
                  <Text>{year}</Text>
                </Span>
              )}
              <Span className="hero-details">
                <Text>Popularity:</Text>{" "}
                <Text>{data[0] && data[0].popularity}</Text>
              </Span>
            </Container>

            <Text className="hero-description">
              {data[0] && data[0].overview}
            </Text>

            <Button
              onClick={() =>
                handleGoToClick(
                  data[0] && data[0].media_type,
                  data[0] && data[0].id
                )
              }
            >
              See details
            </Button>
          </Container>
        </Container>
      </>
    )
  );
};

export default Hero;
