import React, { useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { Search } from "@styled-icons/bootstrap/Search";
import { Close } from "@styled-icons/ionicons-solid/Close";

import Container from "components/primitive/Container";
import Input from "components/primitive/Input";
import Label from "components/primitive/Label";
import Button from "components/primitive/Button";
import Text from "components/primitive/Text";

import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";

const SearchBar = () => {
  const {
    searchVisible,
    handleMediaClick,
    handleInputChange,
    handleCloseSearchClick,
    setNewSearch,
    setShowResults,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      history.push("/discover");
      setNewSearch(true);
      setShowResults(false);
    }
  };

  return (
    <Container className={`main-searchbar-container ${theme}`}>
      <Container
        className={`search-container ${searchVisible && "visible"}  ${theme}`}
      >
        <Container className={`close-options-container ${theme}`}>
          <Container
            as="form"
            className={`options-container ${theme}`}
            onClick={(event) => handleMediaClick(event)}
          >
            <Text className={`search-text ${theme}`}>Filter By</Text>
            <Container className="radio-buttons-container">
              <Label className={`search-label ${theme}`}>
                <Input
                  type="radio"
                  name="mediatype"
                  value="movie"
                  className={`radio-input ${theme}`}
                  defaultChecked
                />
                Movie
              </Label>
              <Label className={`search-label ${theme}`}>
                <Input
                  type="radio"
                  name="mediatype"
                  value="tv"
                  className={`radio-input ${theme}`}
                />
                TV Show
              </Label>
            </Container>
            <Link
              to="/discover"
              className={`search-link ${theme}`}
              onClick={handleCloseSearchClick}
            >
              Search by filtering
            </Link>
          </Container>
          <Close
            onClick={() => {
              handleCloseSearchClick();
            }}
            className={`close-options-icon ${theme}`}
            aria-hidden="true"
            aria-label="Close"
          />
        </Container>
        <Container
          as="form"
          type="submit"
          onSubmit={(event) => handleInputChange(event)}
          className={`search-input-container ${theme}`}
        >
          <Input
            type="text"
            placeholder="Search..."
            name="input"
            className={`search-input ${theme}`}
          />
          <Button
            type="submit"
            onClick={(event) => handleSearch(event)}
            onKeyDown={(event) => handleSearch(event)}
            className={`search-button `}
          >
            <Search
              className={`search-icon ${theme}`}
              aria-hidden="true"
              aria-label="Search"
            />
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchBar;
