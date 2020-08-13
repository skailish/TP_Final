import React, { useEffect, useState, useContext } from "react";
import Container from "../../components/primitive/Container";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";
import ThemeContext from "../../contexts/ThemeContext";

const Categories = () => {
  const { media, category } = useParams();
  const [dataByParams, setDataByParams] = useState([]);
  const { theme } = useContext(ThemeContext);

  const title2 = category.split("_").join(" ");

  useEffect(() => {
    const getDataByCategoryAndMedia = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${category}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();
      setDataByParams(dataJson.results);
    };
    getDataByCategoryAndMedia();
  }, []);

  return (
    dataByParams && (
      <Container className={`main-category-container ${theme}`}>
        <Container className="category-title-container">
          <Heading className={`category-heading ${theme} `} level={1}>
            {media === "movie" ? `${title2} movies` : `${title2} tv shows`}
          </Heading>
        </Container>
        {dataByParams.map((singleCard) => (
          <Card
            id={singleCard.id}
            src={singleCard.poster_path}
            title={
              media === "movie" ? singleCard.title : singleCard.original_name
            }
            votes={singleCard.vote_average}
            key={singleCard.id}
            mediaType={media}
          />
        ))}
      </Container>
    )
  );
};

export default Categories;
