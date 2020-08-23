import React, { useContext, useState } from "react";
import Container from "components/primitive/Container";
import Card from "components/Card";
import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";
import Input from "components/primitive/Input";
import Select from "components/primitive/Select";
import Option from "components/primitive/Option";
import Text from "components/primitive/Text";
import Heading from "components/primitive/Heading";
import Button from "components/primitive/Button";
import { Search } from "@styled-icons/bootstrap/Search";

const Discover = () => {
  const {
    discover,
    results,
    media,
    genres,
    years,
    showResults,
    mediaAdvance,
    handleOrderByChange,
    handleMediaChange,
    handleGenreChange,
    handleYearChange,
    handleIntervalChange,
    handleShowResultsClick,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
 



  return (
    <>
      <Container className={`main-search-container`}>
        <Container as="form" className={`options-container ${theme}`}>
          <Text className={`search-text ${theme}`}>Filtrar por</Text>
          <Select name="media" onChange={(event) => handleMediaChange(event)}>
            <Option value="movie">Movie</Option>
            <Option value="tv">TV Show</Option>
          </Select>
          {genres && (
            <Select name="genre" onChange={(event) => handleGenreChange(event)}>
              {" "}
              <Option value={false}>All</Option>
              {genres.map((genre) => (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          )}

          <Select name="year" onChange={(event) => handleIntervalChange(event)}>
            <Option value="before">Before than</Option>
            <Option value="exact">Exact</Option>
            <Option value="after">After than</Option>
          </Select>
          {years && (
            <Select name="years" onChange={(event) => handleYearChange(event)}>
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          )}
          <Select
            name="orderBy"
            onChange={(event) => handleOrderByChange(event)}
          >
            <Option value="popularity.desc">More Popular</Option>
            <Option value="popularity.asc">Less Popular</Option>
            <Option
              value={
                mediaAdvance === "tv"
                  ? "first_air_date.desc"
                  : "release_date.desc"
              }
            >
              Newest
            </Option>
            <Option
              value={
                mediaAdvance === "tv"
                  ? "first_air_date.asc"
                  : "release_date.asc"
              }
            >
              Oldest
            </Option>
            <Option
              value={
                mediaAdvance === "tv"
                  ? "original_name.asc"
                  : "original_title.asc"
              }
            >
              A-Z
            </Option>
            <Option
              value={
                mediaAdvance === "tv"
                  ? "original_name.desc"
                  : "original_title.desc"
              }
            >
              Z-A
            </Option>
            {mediaAdvance === "movie" && (
              <Option value="revenue.desc">Most Revenue</Option>
            )}
            {mediaAdvance === "movie" && <Option value="">Less Revenue</Option>}
          </Select>
          <Button
            onClick={handleShowResultsClick}
            className={`search-button `}
          >
            <Search className={`search-icon ${theme}`} />
          </Button>
        </Container>
      </Container>

      {console.log(results)}
      {results ||
        (discover && (
          <Container className={`results-container ${theme} `}>
            {results &&
              results.map((result) => (
                <Card
                  id={result.id}
                  src={result.poster_path}
                  title={media === "tv" ? result.name : result.title}
                  votes={result.vote_average}
                  key={result.id}
                  mediatype={result.media_type}
                />
              ))}
            {showResults &&
              discover &&
              discover.map((result) => (
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
        ))}
    </>
  );
};

export default Discover;
