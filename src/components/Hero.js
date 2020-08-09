import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ImageContext from "../contexts/ImageContext";
import DataContext from "../contexts/DataContext";
import Rating from "./Rating";
import Container from "./primitive/Container";
import Image from "./primitive/Image";
import Heading from "./primitive/Heading";
import Text from "./primitive/Text";
import Span from "./primitive/Span";
import Button from "./primitive/Button";

const Hero = () => {
  const { data, year, voteAverage } = useContext(DataContext);
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();

  const handleGoToClick = (mediaType, id) => {
    history.push(`/${mediaType}/${id}`);
  };

  return (
    data && (
      <>
        <Container as="header" className="hero-container">
          <Container className="hero-image-container" id={data.id}>
            <Image
              className="hero-background-image"
              src={`${imageBaseUrl}${data.backdrop_path}`}
              alt="Movie background image"
            />
          </Container>
          <Container className="hero-info">
            <Heading>{data.title}</Heading>

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

            <Button onClick={() => handleGoToClick(data.media_type, data.id)}>
              See details
            </Button>
          </Container>
        </Container>
      </>
    )
  );
};

export default Hero;
