import React, { useContext } from "react";

import Container from "../../components/primitive/Container";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";

import ThemeContext from "../../contexts/ThemeContext";

const CategorySimilar = ({ data, mediatype }) => {
  const { theme } = useContext(ThemeContext);

  return (
    data && (
      <Container className={`category-container ${theme}`}>
        <Container className="category-title-container">
          <Heading className={`category-heading ${theme} `} level={1}>
            {mediatype === "movie" ? "Similar Movies" : "Similar Shows"}
          </Heading>
        </Container>
        <Container className={`similar-cards-container ${theme}`}>
          {data &&
            data.map((singleCard) => (
              <Card
                id={singleCard.id}
                src={singleCard.poster_path}
                title={
                  mediatype === "movie"
                    ? singleCard.title
                    : singleCard.original_name
                }
                votes={singleCard.vote_average}
                key={singleCard.id}
                mediatype={mediatype}
              />
            ))}
        </Container>
      </Container>
    )
  );
};

export default CategorySimilar;
