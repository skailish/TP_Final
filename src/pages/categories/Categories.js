import React, { useEffect, useState, useContext } from "react";
import Container from "../../components/primitive/Container";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import ThemeContext from "../../contexts/ThemeContext";

const Categories = () => {
  const { media, category } = useParams();
  const [dataByParams, setDataByParams] = useState([]);
  const { theme } = useContext(ThemeContext);

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
        {console.log(dataByParams)}
        {dataByParams.map((singleCard) => (
          <Card
            id={singleCard.id}
            src={singleCard.poster_path}
            title={
              singleCard.media_type === "tv"
                ? singleCard.original_name
                : singleCard.title
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
