import React, { useContext } from "react";

import Container from "components/primitive/Container";
import Text from "components/primitive/Text";
import Heading from "components/primitive/Heading";
import Image from "components/primitive/Image";
import Span from "components/primitive/Span";
import noImageFound from "../../images/image-not-found-scaled-1150x647.png";

import ImageContext from "contexts/ImageContext";
import ThemeContext from "contexts/ThemeContext";

const CardEpisodes = ({ src, episode, title, overview, date }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Container as="article" className="card-episode">
      <Container className="img-episode-container">
        <Image
          className="media-card-img"
          src={src ? `${imageBaseUrl}${src}` : noImageFound}
        />
      </Container>

      <Container className="card-episode-title">
        <Span className={`${theme}`}>E{episode}</Span>
        <Heading className={`${theme}`} level={3}>
          {title}
        </Heading>
      </Container>
      <Text className={`card-episode-overview ${theme}`}>{overview}</Text>
      <Span className={`card-episode-date ${theme}`}>{date}</Span>
    </Container>
  );
};

export default CardEpisodes;
