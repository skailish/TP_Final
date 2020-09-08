import React, { useContext } from "react";

import imageBaseUrl from "../utils/ImageBaseUrl";

import Container from "./primitive/Container";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import noImageFound from "../images/user.png";

import ThemeContext from "../contexts/ThemeContext";

const CardCast = ({ id, mediatype, src, name, character }) => {
  
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
          src={src ? `${imageBaseUrl}${src}` : noImageFound}
          className="card-img"
          alt={`Image showing poster of "${character}/${name}"`}
        />
      </Container>

      <Container className="cast-heading-container">
        <Heading level={3} className={`media-card-name ${theme} `} id="media-card-name">
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
