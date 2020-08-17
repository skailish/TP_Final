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
    <Container>
      <Image src={`${imageBaseUrl}${src}`} />
      <Container>
        <Span>{episode}</Span>
        <Heading>{title}</Heading>
      </Container>
      <Text>{overview}</Text>
      <Span>{date}</Span>
    </Container>
  );
};

export default CardEpisodes;
