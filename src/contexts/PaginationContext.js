import React, { createContext, useState } from "react";

const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);

  const toFirstPage = () => setPage(1);

  const toPreviousPage = () => (page !== 1 ? setPage(page - 1) : setPage(page));

  const toNextPage = () => {
    page !== maxPage ? setPage(page + 1) : setPage(page);
  };


  const [results, setResults] = useState([])
  const [firstResult, setFirstResult] = useState({})
  const [lastResult, setLastResult] = useState({})

  const toLastPage = () => setPage(maxPage);

  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        setMaxPage,
        toFirstPage,
        toPreviousPage,
        toNextPage,
        toLastPage,
        results, setResults, firstResult, setFirstResult, lastResult, setLastResult
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
export { PaginationProvider };
