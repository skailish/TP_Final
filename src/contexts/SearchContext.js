import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [media, setMedia] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(false);

  const handleSearchBarVisibleClick = () => {
    setSearchVisible(!searchVisible);
    setVisibleResults(false);
  };
  const handleMediaClick = (event) => {
    setMedia(event.target.value);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.input.value);
    setVisibleResults(true);
  };

  useEffect(() => {
    const getSearch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${media}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US&query=${inputValue}&page=1`
      );
      const dataJson = await response.json();
      setResults(dataJson.results);
    };
    getSearch();
  }, [inputValue, media]);

  return (
    <SearchContext.Provider
      value={{
        searchVisible,
        handleSearchBarVisibleClick,
        handleMediaClick,
        visibleResults,
        results,
        media,
        inputValue,
        handleInputChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
