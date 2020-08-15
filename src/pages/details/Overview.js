import React, { useContext } from "react";

import ImageContext from "../../contexts/ImageContext";

import Container from "../../components/primitive/Container";
import Image from "../../components/primitive/Image";
import Text from "../../components/primitive/Text";
import Heading from "../../components/primitive/Heading";

const Overview = (data) => {
  const { imageBaseUrl } = useContext(ImageContext);
  console.log(data);
  return (
    data && (
      <Container className="main-container">
        <Container className="container-serie">
          <Container className="img-container-serie">
            <Image src={`${imageBaseUrl}${data.data.poster_path}`}></Image>
          </Container>
          <Container className="info-container-serie">
            <Container className="title-serie">
              <Heading level={3}>Storyline</Heading>
              <Text>{data.data.overview}</Text>
            </Container>
            <Container className="container-details-serie">
              {/* {data.data.genres.map((genre) => (
                <li>{genre.name}</li>
              ))} */}
            </Container>
          </Container>
        </Container>
      </Container>
    )
  );
};

export default Overview;
