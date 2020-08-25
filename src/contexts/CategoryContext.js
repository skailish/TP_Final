import React, { createContext, useEffect, useState } from 'react'

const CategoryContext = createContext()


const CategoryProvider = ({ children }) => {
    const [maxPage, setMaxPage] = useState(1000);
    const [page, setPage] = useState(1);
    const [media, setMedia] = useState('tv');
    const [category, setCategory] = useState('popular');
    const [dataByParams, setDataByParams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const getDataByCategoryAndMedia = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/${media}/${category}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=${page}`
            );
            const dataJson = await response.json();
            setDataByParams(dataJson.results);
            setMaxPage(dataJson.total_pages);
            setIsLoading(false);
        };
        getDataByCategoryAndMedia();
    }, [page, media, category]);

    return (
        <CategoryContext.Provider
            value={{ maxPage, page, setMedia, setCategory, setPage, dataByParams, isLoading }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContext
export { CategoryProvider }