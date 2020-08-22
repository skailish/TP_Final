import React, { useContext } from "react";
import Container from "components/primitive/Container";
import Card from "components/Card";
import SearchContext from "../contexts/SearchContext";
import ThemeContext from "../contexts/ThemeContext";
import Input from "components/primitive/Input";
import Select from "components/primitive/Select";
import Option from "components/primitive/Option";
import Text from "components/primitive/Text";
import Heading from "components/primitive/Heading";

const Discover = () => {
  const {
    results,
    media,
    genres,
    handleMediaChange,
    handleGenreChange,
    handleYearChange,
    years,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {!results && (
        <Container className={`main-search-container`}>
          <Container as="form" className={`options-container ${theme}`}>
            <Text className={`search-text ${theme}`}>Filtrar por</Text>
            <Select name="media" onChange={(event) => handleMediaChange(event)}>
              <Option value="movie">Movie</Option>
              <Option value="tv">TV Show</Option>
            </Select>
            {genres && (
              <Select
                name="genre"
                onChange={(event) => handleGenreChange(event)}
              >
                {genres.map((genre) => (
                  <Option key={genre.id} value={genre.id}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            )}

            <Select name="year" onChange={(event) => handleYearChange(event)}>
              <Option value="before">Before than</Option>
              <Option value="exact">Exact</Option>
              <Option value="after">After than</Option>
            </Select>
            {years && (
              <Select
                name="years"
                //onChange={(event) => handleSelectedYearChange(event)}
              >
                {years.map((year, index) => (
                  <Option key={index} value={year.year}>
                    {year.year}
                  </Option>
                ))}
              </Select>
            )}
          </Container>
        </Container>
      )}
      {results && (
        <Container className={`results-container ${theme} `}>
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
    </>
  );
};

export default Discover;
