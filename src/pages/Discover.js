import React, { useContext } from "react";

import { Search } from "@styled-icons/bootstrap/Search";

import Container from "components/primitive/Container";
import Card from "components/Card";
import Select from "components/primitive/Select";
import Option from "components/primitive/Option";
import Text from "components/primitive/Text";
import Button from "components/primitive/Button";
import Pagination from "components/Pagination";
import Heading from "components/primitive/Heading";

import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";

const Discover = () => {
  const {
    discover,
    results,
    media,
    genres,
    years,
    showResults,
    mediaAdvance,
    // searchVisible,
    handleOrderByChange,
    handleMediaChange,
    handleGenreChange,
    handleYearChange,
    handleIntervalChange,
    handleShowResultsClick,
    searchPage,
    setSearchPage,
    searchMaxPage,
    genresAdvance,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Container className={`main-discover-filter-container ${theme}`}>
        <Text className={`filter-text ${theme}`}>Filter By</Text>
        <Container as="form" className={`filter-container ${theme}`}>
          <Select
            name="media"
            className={`select-discover ${theme}`}
            onChange={(event) => handleMediaChange(event)}
          >
            <Option className={` ${theme}`} value="movie">
              Movie
            </Option>
            <Option className={` ${theme}`} value="tv">
              TV Show
            </Option>
          </Select>
          {genres && (
            <Select
              className={`select-discover ${theme}`}
              name="genre"
              onChange={(event) => handleGenreChange(event)}
              value={genresAdvance}
            >
              <Option className={` ${theme}`} value={false}>
                All
              </Option>
              {genres.map((genre) => (
                <Option className={` ${theme}`} key={genre.id} value={genre.id}>
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
            <Option className={` ${theme}`} value="after">
              After than
            </Option>
            <Option className={` ${theme}`} value="exact">
              Exact
            </Option>
            <Option className={` ${theme}`} value="before">
              Before than
            </Option>
          </Select>
          {years && (
            <Select
              className={`select-discover ${theme}`}
              name="years"
              onChange={(event) => handleYearChange(event)}
            >
              {years.map((year) => (
                <Option className={` ${theme}`} key={year} value={year}>
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
            <Option className={` ${theme}`} value="popularity.desc">
              More Popular
            </Option>
            <Option className={` ${theme}`} value="popularity.asc">
              Less Popular
            </Option>
            <Option className={` ${theme}`} value="vote_average.desc">
              More Voted
            </Option>
            <Option className={` ${theme}`} value="vote_average.asc">
              Less Voted
            </Option>
            <Option
              className={` ${theme}`}
              value={
                mediaAdvance === "tv"
                  ? "first_air_date.desc"
                  : "release_date.desc"
              }
            >
              Newest
            </Option>
            <Option
              className={` ${theme}`}
              value={
                mediaAdvance === "tv"
                  ? "first_air_date.asc"
                  : "release_date.asc"
              }
            >
              Oldest
            </Option>
            {mediaAdvance === "movie" && (
              <Option className={` ${theme}`} value="original_title.asc">
                A-Z
              </Option>
            )}
            {mediaAdvance === "movie" && (
              <Option className={` ${theme}`} value="original_title.desc">
                Z-A
              </Option>
            )}
            {mediaAdvance === "movie" && (
              <Option className={` ${theme}`} value="revenue.desc">
                Most Revenue
              </Option>
            )}
            {mediaAdvance === "movie" && (
              <Option className={` ${theme}`} value="">
                Less Revenue
              </Option>
            )}
          </Select>
          <Button
            onClick={handleShowResultsClick}
            className={`search-button ${theme} `}
          >
            <Search className={`search-icon ${theme}`} />
          </Button>
        </Container>
      </Container>

      <Container className={`results-pagination-container ${theme}`}>
        {results && (
          <Container className={`results-container ${theme} `}>
            {results &&
              results.map((result) => (
                <Card
                  id={result.id}
                  src={result.poster_path}
                  title={media === "tv" ? result.name : result.title}
                  votes={result.vote_average}
                  key={result.id}
                  mediatype={mediaAdvance}
                />
              ))}
            {searchMaxPage && showResults && (
              <Container>
                <Pagination
                  page={searchPage}
                  maxPage={searchMaxPage}
                  setPage={setSearchPage}
                />
              </Container>
            )}
          </Container>
        )}

        {discover && (
          <Container className={`results-container ${theme} `}>
            {discover.length === 0 && (
              <Heading className="no-results-tilte">
                No results were found
              </Heading>
            )}
            {showResults &&
              discover &&
              discover.map((discover) => (
                <Card
                  id={discover.id}
                  src={discover.poster_path}
                  title={
                    mediaAdvance === "tv"
                      ? discover.name
                      : discover.original_title
                  }
                  votes={discover.vote_average}
                  key={discover.id}
                  mediatype={mediaAdvance}
                />
              ))}
            {searchMaxPage && showResults && discover.length > 1 && (
              <Container>
                {discover.length > 1 && (
                  <Pagination
                    page={searchPage}
                    maxPage={searchMaxPage}
                    setPage={setSearchPage}
                  />
                )}
              </Container>
            )}
          </Container>
        )}
      </Container>
    </>
  );
};

export default Discover;
