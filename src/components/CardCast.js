import React, { useContext } from "react";

import ImageContext from "../contexts/ImageContext";
import ThemeContext from "../contexts/ThemeContext";

import Container from "./primitive/Container";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import noPosterFound from "../images/404PosterNotFound.jpg";

const CardCast = ({ id, mediatype, src, name, character }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card-cast"
      mediatype={mediatype}
    >
      <Container className="img-container">
        <Image
          src={src ? `${imageBaseUrl}${src}` : noPosterFound}
          className="card-img"
          alt={`Image showing poster of "${character}/${name}"`}
        />
      </Container>

      <Container className="cast-heading-container">
        <Heading level={3} className={`media-card-name ${theme} `}>
          {name}
        </Heading>
        <Heading level={3} className={`media-card-character ${theme} `}>
          {character}
        </Heading>
      </Container>
    </Container>
  );
};

export default CardCast;
