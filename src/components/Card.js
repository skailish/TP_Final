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

const Card = ({ cardInfo }) => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const { id, src, title, votes, mediatype, like } = cardInfo;

  const handleMediaDetails = (event, id, mediatype) => {
    if (event.key === "Enter" || event.type === "click") {
      history.push(`/${mediatype}/${id}/info`);
    }
  };

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediatype={mediatype}
      tabIndex="0"
      onClick={(event) => handleMediaDetails(event, id, mediatype)}
      onKeyDown={(event) => handleMediaDetails(event, id, mediatype)}
    >
      <Container>
        <Image
          src={src ? `${imageBaseUrl}${src}` : noPosterFound}
          className="media-card-img"
          alt={`Image showing poster of "${title}"`}
        />
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
      <Container className="media-card-heading-container">
        <Heading level={3} className={`media-card-heading ${theme} `}>
          {title}
        </Heading>
      </Container>
    </Container>
  );
};

export default Card;
