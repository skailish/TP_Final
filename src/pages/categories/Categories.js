import React, { useEffect, useState, useContext } from "react";
import Container from "../../components/primitive/Container";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";
import ThemeContext from "../../contexts/ThemeContext";
import Pagination from "../../components/Pagination";
import PaginationContext from "../../contexts/PaginationContext";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";
import ScrollToTop from "../../components/ScrollToTop";
import FavsContext from "../../contexts/FavsContext";

const overrideDark = css`
  & div {
    background-color: #3fbac2;
  }
`;

const overrideLight = css`
  & div {
    background-color: #992e2e;
  }
`;

const Categories = () => {
  const { media, category } = useParams();
  const [dataByParams, setDataByParams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { page, setMaxPage } = useContext(PaginationContext);
  const { favsArray } = useContext(FavsContext);

  const title2 = category.split("_").join(" ");

  useEffect(() => {
    setIsLoading(true);

    const getDataByCategoryAndMedia = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${category}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=${page}`
      );
      const dataJson = await response.json();
      setDataByParams(dataJson.results);
      setMaxPage(dataJson.total_pages);
      setIsLoading(false);
    };
    getDataByCategoryAndMedia();
  }, [page]);

  return (
    <>
      {isLoading && (
        <Container className={`onLoading-Container ${theme}`}>
          {theme === "dark" ? (
            <BounceLoader css={overrideDark} size="100" />
          ) : (
            <BounceLoader css={overrideLight} size="100" />
          )}
        </Container>
      )}
      {!isLoading && favsArray && (
        <Container className={`category-pagination-container ${theme}`}>
          <ScrollToTop />
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
                title={media === "movie" ? singleCard.title : singleCard.name}
                votes={singleCard.vote_average}
                key={singleCard.id}
                mediatype={media}
                like={favsArray.includes(singleCard.id)}
              />
            ))}
          </Container>
          <Pagination />
        </Container>
      )}
    </>
  );
};

export default Categories;
