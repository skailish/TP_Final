import React, { useContext } from "react";
import Container from "../components/primitive/Container";
import Card from "./Card";
import MovieContext from "../contexts/MovieContext";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";

const CardListPreview = ({ mediaType }) => {
  const { dataMovie } = useContext(MovieContext);

  return (
    dataMovie && (
      <Container className="cardlistpreview-container">
        <Container className="chevron-container chevron-left">
          <ChevronLeft className="chevron-icon" />
        </Container>
        <Container className="media-container">
          {dataMovie &&
            dataMovie.map((movie) => (
              <Card
                id={movie.id}
                src={movie.poster_path}
                title={
                  mediaType === "tv"
                    ? movie.original_name
                    : movie.original_title
                }
                votes={movie.vote_average}
                key={movie.id}
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
