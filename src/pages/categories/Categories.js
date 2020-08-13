<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Container from "../../components/primitive/Container";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

const Categories = () => {
  const { media, category } = useParams();
  const [dataByParams, setDataByParams] = useState([]);

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
      <Container className="main-category-container">
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
=======
import React from "react";
import Container from "../../components/primitive/Container";

const Categories = () => {
  return (
    <Container className="main-container">
      <h1>Categories!!!</h1>
    </Container>
>>>>>>> 80542d4a42cd66ca8e05214ee4535412f46be9d9
  );
};

export default Categories;
