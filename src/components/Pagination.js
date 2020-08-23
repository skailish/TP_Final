import React, { useContext } from "react";
import Container from "./primitive/Container";
import ButtonPagination from "./primitive/ButtonPagination";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import PaginationContext from "../contexts/PaginationContext";
import ThemeContext from "../contexts/ThemeContext";
import PageButton from "./PageButton";
import SearchContext from "contexts/SearchContext";

const Pagination = () => {
  const {
    page,
    maxPage,
    toPreviousPage,
    toNextPage,
    setPage,
    setMaxPage,
  } = useContext(PaginationContext);
  const { searchPage, searchMaxPage } = useContext(SearchContext);

  const { theme } = useContext(ThemeContext);
  const paginas = maxPage > 6 ? 6 : maxPage;
  return (
    <>
      <Container className={`pagination-container ${theme}`}>
        {page > 1 && (
          <ButtonPagination
            className={`pagination-arrow`}
            onClick={() => toPreviousPage()}
          >
            <ArrowIosBackOutline />
          </ButtonPagination>
        )}
        {page < 5 && (
          <>
            {[...Array(5)].map((pageBtn, i) => (
              <PageButton key={i + 1} value={i + 1} content={i + 1} />
            ))}
            <PageButton value={maxPage - 3} key={maxPage - 3} content={"..."} />
            <PageButton value={maxPage} key={maxPage} content={maxPage} />
          </>
        )}
        {page >= 5 && page < maxPage - 4 && (
          <>
            <PageButton value={1} key={1} content={1} />
            <PageButton value={3} key={3} content={"..."} />
            <PageButton value={page - 1} key={page - 1} content={page - 1} />
            <PageButton value={page} key={page} content={page} />
            <PageButton value={page + 1} key={page + 1} content={page + 1} />
            <PageButton value={maxPage - 3} key={maxPage - 3} content={"..."} />
            <PageButton value={maxPage} key={maxPage} content={maxPage} />
          </>
        )}
        {page >= maxPage - 4 && (
          <>
            <PageButton value={1} key={1} content={1} />
            <PageButton value={4} key={4} content={"..."} />
            <PageButton
              value={maxPage - 4}
              key={maxPage - 4}
              content={maxPage - 4}
            />
            <PageButton
              value={maxPage - 3}
              key={maxPage - 3}
              content={maxPage - 3}
            />
            <PageButton
              value={maxPage - 2}
              key={maxPage - 2}
              content={maxPage - 2}
            />
            <PageButton
              value={maxPage - 1}
              key={maxPage - 1}
              content={maxPage - 1}
            />
            <PageButton value={maxPage} key={maxPage} content={maxPage} />
          </>
        )}
        {page < maxPage && (
          <ButtonPagination
            className={`pagination-arrow`}
            onClick={() => toNextPage()}
          >
            <ArrowIosForwardOutline />
          </ButtonPagination>
        )}
      </Container>
    </>
  );
};

export default Pagination;
