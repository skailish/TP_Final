import React, { useContext } from "react";
import Container from "../../components/primitive/Container";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";
import ThemeContext from "../../contexts/ThemeContext";

const CategorySimilar = (data, mediaType) => {
  const { theme } = useContext(ThemeContext);

  return (
    data.data && (
      <Container className={`category-container ${theme}`}>
        <Container className="category-title-container">
          <Heading className={`category-heading ${theme} `} level={1}>
            {mediaType === "movie" ? "Similar Movies" : "Similar Shows"}
          </Heading>
        </Container>
        {data.data &&
          data.data.map((singleCard) => (
            <Card
              id={singleCard.id}
              src={singleCard.poster_path}
              title={
                mediaType === "movie"
                  ? singleCard.title
                  : singleCard.original_name
              }
              votes={singleCard.vote_average}
              key={singleCard.id}
              mediaType="tv"
            />
          ))}
      </Container>
    )
  );
};

export default CategorySimilar;
