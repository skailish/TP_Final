import React, { useContext } from "react";
import Container from "./primitive/Container";
import ButtonPagination from "./primitive/ButtonPagination";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import ThemeContext from "../contexts/ThemeContext";
import PageButton from "./PageButton";

const Pagination = ({ page, maxPage, setPage }) => {
  const { theme } = useContext(ThemeContext);

  const toPreviousPage = () => (page !== 1 ? setPage(page - 1) : setPage(page));

  const toNextPage = () => {
    page !== maxPage ? setPage(page + 1) : setPage(page);
  };

  const paginas = maxPage > 6 ? 6 : maxPage;

  return (
  <>
    { (paginas > 1) && 
    (
        <Container className={ `pagination-container ${theme}` }>
        {page > 1 && (
          <ButtonPagination
          className={`pagination-arrow`}
          onClick={() => toPreviousPage()}
          >
            <ArrowIosBackOutline className={'arrows'} />
          </ButtonPagination>
          )}
          { paginas >= 6 && page < 5 &&
          <>
            {[...Array(5)].map((pageBtn, i) => (
              <PageButton setPage={setPage} page={page} key={i + 1} value={i + 1} content={i + 1} />
            ))}
            <PageButton setPage={ setPage } page={ page } value={ maxPage - 3 } key={ maxPage - 3 } content={ "..." } />
            <PageButton setPage={setPage} page={page} value={maxPage} key={maxPage} content={maxPage} />
          </>
        }
        {paginas >= 6 && page >= 5 && page < maxPage - 4 && (
          <>
            <PageButton setPage={setPage} page={page} value={1} key={1} content={1} />
            <PageButton setPage={setPage} page={page} value={3} key={3} content={"..."} />
            <PageButton setPage={setPage} page={page} value={page - 1} key={page - 1} content={page - 1} />
            <PageButton setPage={setPage} page={page} value={page} key={page} content={page} />
            <PageButton setPage={setPage} page={page} value={page + 1} key={page + 1} content={page + 1} />
            <PageButton setPage={setPage} page={page} value={maxPage - 3} key={maxPage - 3} content={"..."} />
            <PageButton setPage={setPage} page={page} value={maxPage} key={maxPage} content={maxPage} />
          </>
        )}
        {paginas >= 6 && page >= maxPage - 4 && (
          <>
            <PageButton setPage={setPage} page={page} value={1} key={1} content={1} />
            <PageButton setPage={setPage} page={page} value={4} key={4} content={"..."} />
            <PageButton setPage={setPage} page={page}
              value={maxPage - 4}
              key={maxPage - 4}
              content={maxPage - 4}
            />
            <PageButton setPage={setPage} page={page}
              value={maxPage - 3}
              key={maxPage - 3}
              content={maxPage - 3}
            />
            <PageButton setPage={setPage} page={page}
              value={maxPage - 2}
              key={maxPage - 2}
              content={maxPage - 2}
            />
            <PageButton setPage={setPage} page={page}
              value={maxPage - 1}
              key={maxPage - 1}
              content={maxPage - 1}
            />
            <PageButton setPage={setPage} page={page} value={maxPage} key={maxPage} content={maxPage} />
          </>
        ) }
        { (paginas < 6 && 
                    <>
            {[...Array(paginas-1)].map((pageBtn, i) => (
              <PageButton setPage={setPage} page={page} key={i + 1} value={i + 1} content={i + 1} />
            ))}
            <PageButton setPage={ setPage } page={ page } value={ maxPage } key={ maxPage } content={ maxPage } />
          </>
          
          ) }
        {page < maxPage && (
          <ButtonPagination
            className={`pagination-arrow`}
            onClick={() => toNextPage()}
          >
            <ArrowIosForwardOutline className={'arrows'} />
          </ButtonPagination>
        )}
      </Container>
    )
  }
  </>)
};

export default Pagination;
