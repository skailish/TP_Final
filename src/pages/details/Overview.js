import React, { useContext } from "react";

import ImageContext from "../../contexts/ImageContext";

import Container from "../../components/primitive/Container";
import Image from "../../components/primitive/Image";
import Text from "../../components/primitive/Text";
import Heading from "../../components/primitive/Heading";
import Link from "../../components/primitive/Link";

const Overview = ({ data, mediatype }) => {
  const { imageBaseUrl } = useContext(ImageContext);

  return (
    data &&
    mediatype && (
      <Container className="main-container">
        <Container className="serie-container">
          <Container className="img-serie-container">
            <Image src={`${imageBaseUrl}${data.poster_path}`} />
          </Container>
          <Container className="info-serie-container">
            <Container className="title-serie">
              <Heading level={3}>Storyline</Heading>
              <Text>{data.overview}</Text>
            </Container>
            <Container className="details-serie-container">
              <ul className="details-serie-list">
                <li className="list-item">
                  Genres:
                  <div>
                    {data.genres &&
                      data.genres.map((genre) => (
                        <Link
                          href={`/tv/category/${genre.name.toLowerCase()}`}
                          className="list-item"
                          key={genre.id}
                        >
                          {genre.name},
                        </Link>
                      ))}
                  </div>
                </li>
                <li className="list-item">
                  First Aired: {data.first_air_date}
                </li>

                <li className="list-item">Seasons: {data.number_of_seasons}</li>

                <li className="list-item">
                  Episodes: {data.number_of_episodes}
                </li>

                <li className="list-item">Last Aired: {data.last_air_date}</li>

                <li className="list-item">Status: {data.status}</li>
              </ul>
            </Container>
          </Container>
        </Container>
      </Container>
    )
  );
};

export default Overview;
