import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

const ButtonPagination = ({ children, ...props }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <button className={`button-pagination ${theme}`} {...props}>
            {children}
        </button>
    )
}

export default ButtonPagination
