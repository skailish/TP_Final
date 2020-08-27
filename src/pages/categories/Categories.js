import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import Container from "../../components/primitive/Container";
import Card from "../../components/Card";
import Heading from "../../components/primitive/Heading";
import ThemeContext from "../../contexts/ThemeContext";
import Pagination from "../../components/Pagination";
import ScrollToTop from "../../components/ScrollToTop";

import CategoryContext from "../../contexts/CategoryContext";
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
  const { theme } = useContext(ThemeContext);
  const { favsArray } = useContext(FavsContext);
  const {
    page,
    setPage,
    maxPage,
    dataByParams,
    setMedia,
    setCategory,
    isLoading,
  } = useContext(CategoryContext);

  const title2 = category.split("_").join(" ");

  useEffect(() => {
    setMedia(media);
    setCategory(category);
  }, [media, category]);

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
          <Pagination page={page} maxPage={maxPage} setPage={setPage} />
        </Container>
      )}
    </>
  );
};

export default Categories;
