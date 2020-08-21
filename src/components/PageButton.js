import React, { useContext } from 'react'
import PaginationContext from "../contexts/PaginationContext"

const PageButton = ({ index, currentPage, maxPage }) => {
    const { setPage } = useContext(PaginationContext);

    return (
        index === 7 ?
            (<div onClick={setPage(maxPage)} className={`pagination-page ${currentPage === (maxPage) ? 'active-page' : ''}`} value={maxPage}>{maxPage}</div>) :
            (<div onClick={setPage(index + 1)} className={`pagination-page ${currentPage === (index) ? 'active-page' : ''}`} value={index + 1}>{(index + 1)}</div>)
    )
}





export default PageButton
