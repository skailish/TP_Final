import React, { useContext } from "react";
import Container from "./primitive/Container";
import Button from "./primitive/Button";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import PaginationContext from "../contexts/PaginationContext";
import ThemeContext from "../contexts/ThemeContext";
import PageButton from "./PageButton";

const Pagination = (maxPage) => {
  const { setPage, page, toPreviousPage, toNextPage } = useContext(
    PaginationContext
  );
  const { theme } = useContext(ThemeContext);
  const handleClick = (target) => console.log(target);
  return (
    <>
      <Container className={`pagination-container ${theme}`}>
        <Button className={`pagination-button`} onClick={() => toPreviousPage()}>
          <ArrowIosBackOutline />
        </Button>
        {[...Array(7)].map((pageBtn, i) => <PageButton key={i} index={i} currentPage={page} maxPage={maxPage} />)}
        <Button
          className={`pagination-button`}
          onClick={() => toNextPage()}
        >
          <ArrowIosForwardOutline />
        </Button>
      </Container>
    </>
  );
};

export default Pagination;
