import React, { useContext } from "react";
import Container from "./primitive/Container";
import Rating from "./Rating";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import ImageContext from "../contexts/ImageContext";
import { useHistory } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

const Card = ({ id, src, title, votes, mediaType }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleMediaDetailsClick = (id, mediaType) => {
    history.push(`/${mediaType}/${id}/info`);
  };

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediaType={mediaType}
      onClick={() => handleMediaDetailsClick(id, mediaType)}
    >
      <Image src={`${imageBaseUrl}${src}`} className="media-card-img" />
      <Container className="media-card-heading-container">
        <Heading level={3} className={`media-card-heading ${theme} `}>
          {title}
        </Heading>
      </Container>

      <Rating
        voteAverage={votes}
        voteNumber={votes}
        className={`media-card-rating ${theme} `}
      />
    </Container>
  );
};

export default Card;
