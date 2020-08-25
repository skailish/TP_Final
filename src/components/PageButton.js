import React, { useContext } from 'react'
import PaginationContext from "../contexts/PaginationContext"
import ButtonPagination from "./primitive/ButtonPagination"

const PageButton = ({ value, content, setPage, page }) => {
    return (

        <ButtonPagination onClick={() => setPage(value)} className={`pagination-button ${page === (value) ? 'active-page' : ''}`} value={value}>{content}</ButtonPagination>
    )
}





export default PageButton
