import React, { useContext } from "react";

import ImageContext from "../../contexts/ImageContext";
import ThemeContext from "../../contexts/ThemeContext";

import Container from "../../components/primitive/Container";
import Image from "../../components/primitive/Image";
import Text from "../../components/primitive/Text";
import Heading from "../../components/primitive/Heading";
import Span from "../../components/primitive/Span";
import List from "../../components/primitive/List";
import ListItem from "../../components/primitive/ListItem";

const Overview = ({ data, mediatype }) => {
  const { imageBaseUrl } = useContext(ImageContext);
  const { theme } = useContext(ThemeContext);

  return (
    data &&
    mediatype && (
      <Container className={`overview-main-container ${theme}`}>
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
              <List className="details-serie-list">
                <ListItem className="list-item">
                  <Container className="list-item-title">Genres:</Container>
                  <Container className="list-item-details">
                    {data.genres &&
                      data.genres.map((genre) => (
                        <Span key={genre.id}>{genre.name}, </Span>
                      ))}
                  </Container>
                </ListItem>
                <ListItem className="list-item">
                  <Container className="list-item-title">
                    {mediatype === "tv" ? "First Aired:" : "Released:"}
                  </Container>
                  <Container className="list-item-details">
                    {mediatype === "tv"
                      ? data.first_air_date
                      : data.release_date}
                  </Container>
                </ListItem>

                <ListItem className="list-item">
                  <Container className="list-item-title">
                    {mediatype === "tv" ? "Seasons:" : "Runtime:"}
                  </Container>
                  <Container className="list-item-details">
                    {mediatype === "tv" ? data.number_of_seasons : data.runtime}
                  </Container>
                </ListItem>

                <ListItem className="list-item">
                  <Container className="list-item-title">
                    {mediatype === "tv" ? "Episodes:" : "Budget"}
                  </Container>
                  <Container className="list-item-details">
                    {mediatype === "tv" ? data.number_of_episodes : data.budget}
                  </Container>
                </ListItem>

                <ListItem className="list-item">
                  <Container className="list-item-title">
                    {mediatype === "tv" ? "Last Aired:" : "Production"}
                  </Container>
                  <Container className="list-item-details">
                    {mediatype === "tv"
                      ? data.last_air_date
                      : data.production_companies &&
                        data.production_companies.map((production) => (
                          <Span>{production.name}, </Span>
                        ))}
                  </Container>
                </ListItem>

                <ListItem className="list-item">
                  <Container className="list-item-title">Status:</Container>
                  <Container className="list-item-details">
                    {data.status}
                  </Container>
                </ListItem>
              </List>
            </Container>
          </Container>
        </Container>
      </Container>
    )
  );
};

export default Overview;
