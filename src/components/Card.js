import React, {useContext} from "react";
import Container from "./primitive/Container";
import Rating from "./Rating";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import ImageContext from "../contexts/ImageContext";


const Card = ({ id, src, title, votes }) => {
  const {imageBaseUrl} = useContext(ImageContext)

  return (
    <Container id={id} key={id} as="article" className="media-card">
      <Image src={`${imageBaseUrl}${src}`} className="media-card-img" />
      <Heading level={3} className="media-card-heading">{title}</Heading>
      <Rating voteAverage={votes} voteNumber={votes} className="media-card-rating" />
    </Container>
  );
};

export default Card;
