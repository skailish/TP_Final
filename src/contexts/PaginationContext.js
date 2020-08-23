import React, { createContext, useState } from "react";

const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);






  // const onPageChange = (currentPage) => {
  //   const pageButtons = [Array(5)];
  //   return (
  //     pageButtons.map((button, i) => {
  //       if (i + 1 === 7) {
  //         return (<div onClick={() => setPage(maxPage)} className={`pagination-page ${currentPage === (maxPage) ? 'active-page' : ''}`}>{maxPage}</div>)
  //       } else {
  //         return (<div onClick={() => setPage(i + 1)} className={`pagination-page ${currentPage === (i + 1) ? 'active-page' : ''}`}>{(i + 1)}</div>)
  //       }
  //     }
  //     )
  //   )
  // }


  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        setMaxPage,
        maxPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
export { PaginationProvider };
