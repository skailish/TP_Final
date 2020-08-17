import React, { useContext } from "react";

import ImageContext from "contexts/ImageContext";

import Container from "components/primitive/Container";
import Text from "components/primitive/Text";
import Heading from "components/primitive/Heading";
import Image from "components/primitive/Image";
import Span from "components/primitive/Span";

const CardEpisodes = ({ src, episode, title, overview, date }) => {
  const { imageBaseUrl } = useContext(ImageContext);

  return (
    <Container as="article" className="card-episode">
      <Container className="img-episode-container">
        <Image className="media-card-img" src={`${imageBaseUrl}${src}`} />
      </Container>

      <Container className="card-episode-title">
        <Span>E{episode}</Span>
        <Heading level={3}>{title}</Heading>
      </Container>
      <Text className="card-episode-overview">{overview}</Text>
      <Span className="card-episode-date">{date}</Span>
    </Container>
  );
};

export default CardEpisodes;
