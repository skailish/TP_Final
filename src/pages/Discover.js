import React, { useContext } from "react";

import { Search } from "@styled-icons/bootstrap/Search";

import {
  Container,
  Card,
  Select,
  Option,
  Label,
  Text,
  Button,
  Pagination,
  Heading,
  ScrollToTop,
} from "components";

import DiscoverContext from "../contexts/DiscoverContext";
import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";

const Discover = () => {
  const {
    discover,
    genres,
    years,
    mediaAdvance,
    genresAdvance,
    discoverMaxPage,
    handleIntervalChange,
    handleMediaChange,
    handleGenreChange,
    handleYearChange,
    handleOrderByChange,
    setDiscoverPage,
  } = useContext(DiscoverContext);
  const {
    searchPage,
    searchVisible,
    results,
    media,
    showResults,
    searchMaxPage,
    handleShowResultsClick,
    setSearchPage,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ScrollToTop />
      {!searchVisible && (
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
                  <Option
                    className={` ${theme}`}
                    key={genre.id}
                    value={genre.id}
                  >
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
            <Container className="search-discover-icon">
              <Button
                onClick={handleShowResultsClick}
                className={`search-button ${theme} `}
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
      )}

      <Container
        className={`results-pagination-container ${
          searchVisible && "main-results-container"
        } ${theme}`}
      >
        {searchVisible && results && (
          <Container className={`results-container ${theme} `}>
            <Container className="cards-results-container">
              {results &&
                results.map((result) => (
                  <Card
                    cardInfo={{
                      id: result.id,
                      src: result.poster_path,
                      title: media === "tv" ? result.name : result.title,
                      votes: result.vote_average,
                      key: result.id,
                      mediatype: media,
                    }}
                  />
                ))}
            </Container>
            {searchMaxPage && (
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

        {showResults && discover && (
          <Container className={`discover-results-container ${theme} `}>
            {showResults && discover.length === 0 && (
              <Heading className={`no-results-tilte ${theme}`}>
                No results were found
              </Heading>
            )}
            <Container className="cards-discover-container">
              {showResults &&
                discover.length > 1 &&
                discover.map((discover) => (
                  <Card
                    cardInfo={{
                      id: discover.id,
                      src: discover.poster_path,
                      title:
                        mediaAdvance === "tv"
                          ? discover.name
                          : discover.original_title,

                      votes: discover.vote_average,
                      key: discover.id,
                      mediatype: mediaAdvance,
                    }}
                  />
                ))}
            </Container>
            {discoverMaxPage !== 0 && showResults && discover.length > 1 && (
              <Container>
                {discover.length > 1 && (
                  <Pagination
                    page={searchPage}
                    maxPage={discoverMaxPage}
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
