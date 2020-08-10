import React from "react";
import Container from "./primitive/Container";
import Raiting from "./Rating";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";

const Cards = ({ id, src, title, votes }) => {
  return (
    <Container id={id} key={id} as="article">
      <Image src={src} />
      <Heading>{title}</Heading>
      <Raiting voteAverage={votes} voteNumber={votes} />
    </Container>
  );
};

export default Cards;
