import React, { useContext } from "react";

import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";

import Container from "./primitive/Container";
import ButtonPagination from "./primitive/ButtonPagination";
import PageButton from "./PageButton";

import ThemeContext from "../contexts/ThemeContext";

const Pagination = ({ page, maxPage, setPage }) => {
  const { theme } = useContext(ThemeContext);
  const toPreviousPage = () => (page !== 1 ? setPage(page - 1) : setPage(page));
  const toNextPage = () => {
    page !== maxPage ? setPage(page + 1) : setPage(page);
  };
  const paginas = maxPage > 6 ? 6 : maxPage;

  const getPagination = (maxPage, page, paginas) => {
    // const pagination = Array.from({ length: 100 }, (_, i) => i + 1);
    const pagination = [];
    if (page > 1) {
      pagination.push(<ButtonPagination
        className={ `pagination-arrow` }
        onClick={ () => toPreviousPage() }
      ><ArrowIosBackOutline className={ "arrows" } />
      </ButtonPagination>)
    }
    if (paginas >= 6 && page < 5) {
      [...Array(5)].map((pageBtn, i) => {
        pagination.push([i + 1, i + 1, i + 1], [maxPage - 3, maxPage - 3, "..."], [maxPage, maxPage, maxPage])
      })
    }
       
    if (paginas >= 6 && page >= 5 && page < maxPage - 4) {
      pagination.push([1,1,1],[3,3,"..."],[page - 1,page - 1,page - 1],[page,page,page],[page + 1,page + 1,page + 1],[maxPage - 3,maxPage - 3,"..."],[maxPage,maxPage,maxPage])
    }
    if (paginas >= 6 && page >= maxPage - 4) {
    pagination.push([ 1,1,1],[4,4,"..."],[maxPage - 4,maxPage - 4,maxPage - 4],[maxPage - 3,maxPage - 3,maxPage - 3],[maxPage - 2,maxPage - 2,maxPage - 2],[maxPage - 1,maxPage - 1,maxPage - 1],[maxPage,maxPage,maxPage])}
    if (paginas < 6) {
      [...Array(paginas - 1)].map((pageBtn, i) => (
           pagination.push([
          i + 1,
          i + 1,
          i + 1
        ],
        [
          maxPage,
          maxPage,
          maxPage
        ]
      )))
    }
         
    if (page < maxPage) {
      pagination.push(
        <ButtonPagination
          className={ `pagination-arrow` }
          onClick={ () => toNextPage() }
        >
          <ArrowIosForwardOutline className={ "arrows" } />
        </ButtonPagination>)
         
    }

  } 
  const pagination = getPagination(maxPage, page, paginas);
  console.log(pagination);
  return (
    <>
      {
    // paginas > 1 && (
      //   <Container className={`pagination-container ${theme}`}>
      //     pagination.map(pageIndex => pageIndex)
      //   </Container>
        // )
      }
      </>
        )
      };

export default Pagination;
