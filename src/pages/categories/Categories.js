import React, { useEffect, useState, useContext } from "react";
import Container from "../../components/primitive/Container";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";
import ThemeContext from "../../contexts/ThemeContext";
import Pagination from "../../components/Pagination";
import PaginationContext from "../../contexts/PaginationContext";

const Categories = () => {
  const { media, category } = useParams();
  const [dataByParams, setDataByParams] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { page, setMaxPage } = useContext(PaginationContext);

  const title2 = category.split("_").join(" ");

  useEffect(() => {
    const getDataByCategoryAndMedia = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${category}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=${page}`
      );
      const dataJson = await response.json();
      setDataByParams(dataJson.results);
      setMaxPage(dataJson.total_pages);
    };
    getDataByCategoryAndMedia();
  }, [page]);

  return (
    dataByParams && (
      <Container className={`category-pagination-container ${theme}`}>
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
        <Pagination />
      </Container>
    )
  );
};

export default Categories;
