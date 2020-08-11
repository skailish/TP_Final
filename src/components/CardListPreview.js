import React from "react";
import Container from "../components/primitive/Container";
import Card from "./Card";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import Heading from "./primitive/Heading";

const CardListPreview = ({ mediaType, data, sectionTitle }) => {
  return (
    data && (
      <Container className="cardlistpreview-container">
        <Heading className="cardlistpreview-heading" level={1}>
          {sectionTitle}
        </Heading>
        <Container className="chevron-container chevron-left">
          <ChevronLeft className="chevron-icon" />
        </Container>
        <Container className="media-container">
          {data &&
            data.map((singleCard) => (
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
