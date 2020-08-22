import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [media, setMedia] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(false);
  const [mountResults, setMountResults] = useState(false);
  const [genres, setGenres] = useState([]);
  const [mediaAdvance, setMediaAdvance] = useState("movie");
  const [genresAdvance, setGenresAdvance] = useState("");
  const [years, setYears] = useState([]);

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
    setMountResults(true);
    console.log(event.target.input.value);
  };

  const handleCloseSearchClick = () => {
    setVisibleResults(false);
    setSearchVisible(false);
  };

  const handleMediaChange = (event) => {
    setMediaAdvance(event.target.value);
    console.log(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenresAdvance(event.target.value);
    console.log(event.target.value);
  };

  const handleYearChange = (event) => {
    setYears(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    const getSearch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${media}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US&query=${inputValue}&page=1`
      );
      const dataJson = await response.json();
      setResults(dataJson.results);
      setMountResults(true);
    };
    getSearch();
  }, [inputValue, media]);

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${mediaAdvance}/list?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US`
      );
      const dataJson = await response.json();
      setGenres(dataJson.genres);
    };
    getGenres();
  }, [mediaAdvance]);

  useEffect(() => {
    const getYears = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?with_genres=${genresAdvance}&api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US`
      );
      const dataJson = await response.json();
      setYears(dataJson.genres);
      console.log(dataJson);
    };
    getYears();
  }, [mediaAdvance, genresAdvance]);

  return (
    <SearchContext.Provider
      value={{
        searchVisible,
        visibleResults,
        results,
        media,
        inputValue,
        mountResults,
        handleSearchBarVisibleClick,
        handleMediaClick,
        setSearchVisible,
        setVisibleResults,
        handleInputChange,
        handleCloseSearchClick,
        genres,
        handleMediaChange,
        handleGenreChange,
        handleYearChange,
        years,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
