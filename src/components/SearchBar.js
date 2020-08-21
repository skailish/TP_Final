import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "components/primitive/Container";
import Input from "components/primitive/Input";
import Label from "components/primitive/Label";
import Button from "components/primitive/Button";
import Text from "components/primitive/Text";
import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";
import { Search } from "@styled-icons/bootstrap/Search";
import Card from "components/Card";

const SearchBar = () => {
  const {
    searchVisible,
    handleMediaClick,
    handleSearchClick,
    results,
    media,
    visibleResults,
    handleInputChange,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Container className={`main-searchbar-container ${theme}`}>
      <Container
        className={`search-container ${searchVisible && "visible"}  ${theme}`}
      >
        <Container
          as="form"
          className={`options-container ${theme}`}
          onClick={(event) => handleMediaClick(event)}
        >
          <Text className={`search-text ${theme}`}>Filtrar por</Text>
          <Label className={`search-label ${theme}`}>
            Movie
            <Input
              type="radio"
              name="mediatype"
              value="movie"
              className={`radio-input ${theme}`}
            />
          </Label>
          <Label className={`search-label ${theme}`}>
            TV Show
            <Input
              type="radio"
              name="mediatype"
              value="tv"
              className={`radio-input ${theme}`}
            />
          </Label>

          <Link to="" className={`search-link ${theme}`}>
            Advanced search
          </Link>
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
          <Button type="submit" className={`search-button `}>
            <Search className={`search-icon ${theme}`} />
          </Button>
        </Container>
      </Container>
      {results && (
        <Container
          className={`results-container ${theme} ${
            visibleResults && "showResults"
          }`}
        >
          {results.map((result) => (
            <Card
              id={result.id}
              src={result.poster_path}
              title={media === "tv" ? result.name : result.title}
              votes={result.vote_average}
              key={result.id}
              mediatype={result.media_type}
            />
          ))}
        </Container>
      )}
    </Container>
  );
};

export default SearchBar;
