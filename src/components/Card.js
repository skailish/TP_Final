import React, { useContext } from "react";
import Container from "./primitive/Container";
import Votes from "./Votes";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import ImageContext from "../contexts/ImageContext";
import { useHistory } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import Tooltip from "./Tooltip";

const Card = ({ id, src, title, votes, mediaType }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleMediaDetailsClick = (id, mediaType) => {
    history.push(`/${mediaType}/${id}`);
  };

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediaType={mediaType}

    >
      <div onClick={() => handleMediaDetailsClick(id, mediaType)}>

        <Image src={`${imageBaseUrl}${src}`} className="media-card-img" />
        <Container className="media-card-heading-container">
          <Tooltip title={"Click for more information on this show"}>
            <Heading level={3} className={`media-card-heading ${theme} `}>
              {title}
            </Heading>
          </Tooltip>
        </Container>
      </div>
      <Tooltip title={"Rate this show"}>
        <Votes
          voteAverage={votes}
          voteNumber={votes}
          className={`media-card-rating ${theme} `}
        />
      </Tooltip>

    </Container>
  );
};

export default Card;
