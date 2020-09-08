import React, { useContext } from "react";
import imageBaseUrl from "../utils/ImageBaseUrl";

import { useHistory } from "react-router-dom";

import Container from "./primitive/Container";
import Votes from "./Votes";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import noPosterFound from "../images/404PosterNotFound.jpg";
import FavIconToggle from "./FavIconToggle";

import ThemeContext from "../contexts/ThemeContext";

const Card = ({ id, src, title, votes, mediatype, like }) => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleMediaDetailsClick = (id, mediatype) => {
    history.push(`/${mediatype}/${id}/info`);
  };

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediatype={mediatype}
    >
      <Container onClick={() => handleMediaDetailsClick(id, mediatype)}>
        <Image
          src={src ? `${imageBaseUrl}${src}` : noPosterFound}
          className="media-card-img"
          alt={`Image showing poster of "${title}"`}
        />
        <Container className="media-card-heading-container">
          <Heading level={3} className={`media-card-heading ${theme} `}>
            {title}
          </Heading>
        </Container>
      </Container>
      <Container className="votes-and-favs-container">
        {title && <Votes contentName={title} voteAverage={votes} />}
        <FavIconToggle
          like={like}
          id={id}
          src={src}
          title={title}
          votes={votes}
          mediatype={mediatype}
        />
      </Container>
    </Container>
  );
};

export default Card;
