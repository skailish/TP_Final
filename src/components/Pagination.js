import React, { useContext } from "react";

import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";

import Container from "./primitive/Container";
import ButtonPagination from "./primitive/ButtonPagination";
import PageButton from "./PageButton";
import ThemeContext from "../contexts/ThemeContext";

const Pagination = ({ page, maxPage, setPage }) => {
  const { theme } = useContext(ThemeContext);
  const amountOfPages = maxPage > 6 ? 6 : maxPage;

  const toPreviousPage = () => (page !== 1 ? setPage(page - 1) : setPage(page));
  const toNextPage = () => {
    page !== maxPage ? setPage(page + 1) : setPage(page);
  };

  const getPagination = (amountOfPages, page, setPage) => {
    let pagination = [];
    if (amountOfPages >= 6 && page < 5) {
      pagination = [...Array(5)].map((pageBtn, i) => (
        <PageButton
          setPage={ setPage }
          page={ page }
          key={ i + 1 }
          value={ i + 1 }
          content={ i + 1 }
        />
      ));
      pagination.push(
        <PageButton
        setPage={setPage}
        page={page}
        value={maxPage - 3}
        key={maxPage - 3}
        content={"..."}
        />,
        <PageButton
        setPage={setPage}
        page={page}
        value={maxPage}
        key={maxPage}
        content={maxPage}
        />)
    } else if (amountOfPages >= 6 && page >= 5 && page < maxPage - 4) {
      pagination.push(<PageButton
          setPage={setPage}
          page={page}
          value={1}
          key={1}
          content={1}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={3}
          key={3}
          content={"..."}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={page - 1}
          key={page - 1}
          content={page - 1}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={page}
          key={page}
          content={page}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={page + 1}
          key={page + 1}
          content={page + 1}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage - 3}
          key={maxPage - 3}
          content={"..."}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage}
          key={maxPage}
          content={maxPage}
        />)
    } else if (amountOfPages >= 6 && page >= maxPage - 4) {
      pagination.push(
        <PageButton
          setPage={setPage}
          page={page}
          value={1}
          key={1}
          content={1}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={4}
          key={4}
          content={"..."}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage - 4}
          key={maxPage - 4}
          content={maxPage - 4}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage - 3}
          key={maxPage - 3}
          content={maxPage - 3}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage - 2}
          key={maxPage - 2}
          content={maxPage - 2}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage - 1}
          key={maxPage - 1}
          content={maxPage - 1}
        />,
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage}
          key={maxPage}
          content={maxPage}
        />)
    } else if(amountOfPages < 6) {
      pagination = [...Array(amountOfPages - 1)].map((pageBtn, i) => (
          <PageButton
            setPage={setPage}
            page={page}
            key={i + 1}
            value={i + 1}
            content={i + 1}
          />
      ))
        pagination.push(
        <PageButton
          setPage={setPage}
          page={page}
          value={maxPage}
          key={maxPage}
          content={maxPage}
        />)
      }
          return [...pagination]
  }

  return (
    <>
      {amountOfPages > 1 && (
        <Container className={`pagination-container ${theme}`}>
          {page > 1 && (
            <ButtonPagination
              className={`pagination-arrow`}
              onClick={() => toPreviousPage()}
            >
              <ArrowIosBackOutline className={"arrows"} />
            </ButtonPagination>
          )}
          {getPagination(amountOfPages,page,setPage)}
          {page < maxPage && (
            <ButtonPagination
              className={`pagination-arrow`}
              onClick={() => toNextPage()}
            >
              <ArrowIosForwardOutline className={"arrows"} />
            </ButtonPagination>
          )}
        </Container>
      )}
    </>
  );
};

export default Pagination;
