import React, { useContext } from "react";
import Container from "../components/primitive/Container";
import Card from "./Card";
import MovieContext from "../contexts/MovieContext";
import TvShowContext from "../contexts/TvShowContext";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";

const CardListPreview = ({ mediaType }) => {
  const { dataMovie } = useContext(MovieContext);
  const { dataTvShow } = useContext(TvShowContext);

  const mediaData = mediaType === "tv" ? dataTvShow : dataMovie;

  return (
    dataMovie && (
      <Container className="cardlistpreview-container">
        <Container className="chevron-container chevron-left">
          <ChevronLeft className="chevron-icon" />
        </Container>
        <Container className="media-container">
          {mediaData &&
            mediaData.map((singleCard) => (
              <Card
                id={singleCard.id}
                src={singleCard.poster_path}
                title={
                  mediaType === "tv"
                    ? singleCard.original_name
                    : singleCard.original_title
                }
                votes={singleCard.vote_average}
                key={singleCard.id}
              />
            ))}
        </Container>
        <Container className="chevron-container chevron-right">
          <ChevronRight className="chevron-icon" />
        </Container>
      </Container>
    )
  );
};

export default CardListPreview;
