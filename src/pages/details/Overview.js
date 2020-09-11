import React, { useContext } from "react";

import imageBaseUrl from "../../utils/ImageBaseUrl";

import {
  Container,
  Image,
  Text,
  Heading,
  Span,
  List,
  ListItem,
} from "../../components";

import ThemeContext from "../../contexts/ThemeContext";

const Overview = ({ data, mediatype }) => {
  const { theme } = useContext(ThemeContext);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

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
              <Text id="overview-description" >{data.overview}</Text>
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
                    {mediatype === "tv"
                      ? data.number_of_seasons
                      : data.runtime + " min"}
                  </Container>
                </ListItem>

                <ListItem className="list-item">
                  <Container className="list-item-title">
                    {mediatype === "tv" ? "Episodes:" : "Budget"}
                  </Container>
                  <Container className="list-item-details">
                    {mediatype === "tv"
                      ? data.number_of_episodes
                      : data.budget === 0
                      ? "-"
                      : formatter.format(data.budget)}
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
