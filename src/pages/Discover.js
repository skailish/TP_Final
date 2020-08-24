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
import Pagination from "components/Pagination";
import PaginationContext from "contexts/PaginationContext";

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
    searchPage,
    setSearchPage,
    searchMaxPage,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Container className={`main-discover-filter-container ${theme}`}>
        <Text className={`filter-text ${theme}`}>Filtrar por</Text>
        <Container as="form" className={`filter-container ${theme}`}>
          <Select
            name="media"
            className={`select-discover ${theme}`}
            onChange={(event) => handleMediaChange(event)}
          >
            <Option value="movie">Movie</Option>
            <Option value="tv">TV Show</Option>
          </Select>
          {genres && (
            <Select
              className={`select-discover ${theme}`}
              name="genre"
              onChange={(event) => handleGenreChange(event)}
            >
              <Option value={false}>All</Option>
              {genres.map((genre) => (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          )}

          <Select
            className={`select-discover ${theme}`}
            name="year"
            onChange={(event) => handleIntervalChange(event)}
          >
            <Option value="after">After than</Option>
            <Option value="exact">Exact</Option>
            <Option value="before">Before than</Option>
          </Select>
          {years && (
            <Select
              className={`select-discover ${theme}`}
              name="years"
              onChange={(event) => handleYearChange(event)}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          )}
          <Select
            className={`select-discover ${theme}`}
            name="orderBy"
            onChange={(event) => handleOrderByChange(event)}
          >
            <Option value="popularity.desc">More Popular</Option>
            <Option value="popularity.asc">Less Popular</Option>
            <Option value="vote_average.desc">More Voted</Option>
            <Option value="vote_average.asc">Less Voted</Option>
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
            {mediaAdvance === "movie" && (
              <Option value="original_title.asc">A-Z</Option>
            )}
            {mediaAdvance === "movie" && (
              <Option value="original_title.desc">Z-A</Option>
            )}
            {mediaAdvance === "movie" && (
              <Option value="revenue.desc">Most Revenue</Option>
            )}
            {mediaAdvance === "movie" && <Option value="">Less Revenue</Option>}
          </Select>
          <Button
            onClick={handleShowResultsClick}
            className={`search-button ${theme} `}
          >
            <Search className={`search-icon ${theme}`} />
          </Button>
        </Container>
      </Container>

      {results ||
        (discover && (
          <Container className={`results-pagination-container`}>
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
                    title={
                      mediaAdvance === "tv"
                        ? result.name
                        : result.original_title
                    }
                    votes={result.vote_average}
                    key={result.id}
                    mediatype={result.media_type}
                  />
                ))}
            </Container>
            {showResults && (
              <Pagination
                page={searchPage}
                maxPage={searchMaxPage}
                setPage={setSearchPage}
              />
            )}
          </Container>
        ))}
    </>
  );
};

export default Discover;
