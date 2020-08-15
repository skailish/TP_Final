import React, { useContext } from "react";

import ImageContext from "../../contexts/ImageContext";

import Container from "../../components/primitive/Container";
import Image from "../../components/primitive/Image";
import Text from "../../components/primitive/Text";
import Heading from "../../components/primitive/Heading";

const Overview = (data) => {
  const { imageBaseUrl } = useContext(ImageContext);
  return (
    data.data && (
      <Container className="main-container">
        <Container className="serie-container">
          <Container className="img-serie-container">
            <Image src={`${imageBaseUrl}${data.data.poster_path}`} />
          </Container>
          <Container className="info-serie-container">
            <Container className="title-serie">
              <Heading level={3}>Storyline</Heading>
              <Text>{data.data.overview}</Text>
            </Container>
            <Container className="details-serie-container">
              {data.data.genres &&
                data.data.genres.map((genre) => <li>{genre.name}</li>)}
            </Container>
          </Container>
        </Container>
      </Container>
    )
  );
};

export default Overview;
