import React, { useState, useEffect, useContext } from 'react'
import Container from "./primitive/Container";
import Button from "./primitive/Button";
import { ArrowLeftCircle } from "@styled-icons/bootstrap/ArrowLeftCircle";
import { ArrowRightCircle } from "@styled-icons/bootstrap/ArrowRightCircle";
import DataContext from "../contexts/DataContext"
import PaginationContext from "../contexts/PaginationContext";
import ThemeContext from "../contexts/ThemeContext";


const Pagination = ({ maxPage, currentPage, onPageChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Container className={`pagination-container ${theme}`}>
        <Button
          className={`pagination-button ${theme}`}
          onClick={onPageChange}
        >
          <ArrowLeftCircle />
        </Button>
        <Container className={`pagination-page ${theme}`}>{currentPage}</Container>
        <Button className={`pagination-button ${theme}`} onClick={onPageChange}>
          <ArrowRightCircle />
        </Button>
      </Container>
    </>
  )
}

export default Pagination