import React, { useContext } from "react";
import Container from "./primitive/Container";
import Votes from "./Votes";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import ImageContext from "../contexts/ImageContext";
import { useHistory } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import noPosterFound from "../images/404PosterNotFound.jpg";

const Card = ({ id, src, title, votes, mediatype }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleMediaDetailsClick = (id, mediatype) => {
    history.push(`/${mediatype}/${id}`);
  };

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediatype={mediatype}

    >
      <div onClick={() => handleMediaDetailsClick(id, mediatype)}>

        <Image src={src ? `${imageBaseUrl}${src}` : noPosterFound} className="media-card-img" alt={`Image showing poster of "${title}"`} />
        <Container className="media-card-heading-container">
          <Heading level={3} className={`media-card-heading ${theme} `}>
            {title}
          </Heading>
        </Container>
      </div>

      <Votes
        voteAverage={votes}
        voteNumber={votes}
        className={`media-card-rating ${theme} `}
      />
    </Container>
  );
};

export default Card;
