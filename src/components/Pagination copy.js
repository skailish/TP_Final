import React, { useContext } from "react";
import Container from "./primitive/Container";
import Button from "./primitive/Button";
import PaginationContext from "../contexts/PaginationContext";
import ThemeContext from "../contexts/ThemeContext";

const Pagination = () => {
  const { theme } = useContext(ThemeContext);
  const {
    page,
    toPreviousPage,
    toFirstPage,
    toNextPage,
    toLastPage,
  } = useContext(PaginationContext);

  return (
    page && (
      <Container className={`pagination-container ${theme}`}>
        <Button className={`pagination-button ${theme}`} onClick={toFirstPage}>
          {"<<"}
        </Button>
        <Button
          className={`pagination-button ${theme}`}
          onClick={toPreviousPage}
        >
          {"<"}
        </Button>
        <Container className={`pagination-page ${theme}`}>{page}</Container>
        <Button className={`pagination-button ${theme}`} onClick={toNextPage}>
          {">"}
        </Button>
        <Button className={`pagination-button ${theme}`} onClick={toLastPage}>
          {">>"}
        </Button>
      </Container>
    )
  );
};

export default Pagination;
