import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  const [media, setMedia] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchMaxPage, setSearchMaxPage] = useState(1000);

  const handleSearchBarVisible = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setSearchVisible(!searchVisible);
      setVisibleResults(false);
    }
  };

  const handleMediaClick = (event) => {
    setMedia(event.target.value);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.input.value);
    setVisibleResults(true);
  };

  const handleCloseSearchClick = () => {
    setVisibleResults(false);
    setSearchVisible(false);
  };

  const handleShowResultsClick = (event) => {
    event.preventDefault();
    setShowResults(true);
  };

  useEffect(() => {
    const getSearch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${
          !media ? "movie" : media
        }?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US${
          inputValue && `&query=${inputValue}`
        }&page=${searchPage}`
      );
      const dataJson = await response.json();
      setResults(dataJson.results);
      setSearchMaxPage(dataJson.total_pages);
      setNewSearch(false);
    };
    getSearch();
  }, [inputValue, media, searchPage, newSearch]);

  return (
    <SearchContext.Provider
      value={{
        searchPage,
        searchVisible,
        visibleResults,
        results,
        media,
        inputValue,
        showResults,
        searchMaxPage,
        handleSearchBarVisible,
        handleMediaClick,
        setSearchVisible,
        setVisibleResults,
        handleInputChange,
        handleCloseSearchClick,
        handleShowResultsClick,
        setSearchPage,
        setNewSearch,
        setShowResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
