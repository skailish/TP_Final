import React, { useEffect, useState, useContext } from "react";
import API_KEY from "../../utils/API_KEY";

import { useParams, useHistory } from "react-router-dom";

import { Container, Text, Select, Option } from "../../components";

import CardEpisodes from "pages/details/CardEpisodes";

import useFetch from "../../hooks/useFetch";

import ThemeContext from "../../contexts/ThemeContext";
import TvShowContext from "../../contexts/TvShowContext";

const Episodes = ({ seasons }) => {
  const { TVId } = useParams();
  const [episodes, setEpisodes] = useState();
  const [episodesLength, setEpisodesLength] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { seasonNumber, setSeasonNumber } = useContext(TvShowContext);
  const history = useHistory();

  const dataJson = useFetch(
    `https://api.themoviedb.org/3/tv/${TVId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
    [seasonNumber]
  );

  useEffect(() => {
    dataJson && setEpisodes(dataJson.episodes);
    dataJson && setEpisodesLength(dataJson.episodes.length);
  }, [dataJson]);


  
  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSeasonNumber(newValue);
    history.push(`/tv/${TVId}/season/${newValue}`);
  };

  return (
    seasons &&
    TVId && (
      <Container className={`episodes-main-container ${theme}`}>
        <Container className="select-episodes-container">
          <Select
            className={`select-episodes ${theme}`}
            onChange={handleChange}
          >
            {seasons &&
              seasons
                .filter((season) => season.name !== "Specials")
                .map((season, index) => (
                  <Option
                    className={`seasons-serie ${theme}`}
                    value={index + 1}
                    key={season.id}
                    id={season.id}
                  >
                    Season {index + 1}
                  </Option>
                ))}
          </Select>
          <Text className={`episodes-length ${theme}`}>
            {episodesLength} Episodes
          </Text>
        </Container>

        <Container className="cards-episodes-container">
          {seasons &&
            episodes &&
            episodes.map((episode) => (
              <CardEpisodes
                key={episode.id}
                src={episode.still_path}
                episode={episode.episode_number}
                title={episode.name}
                overview={episode.overview}
                date={episode.air_date}
              ></CardEpisodes>
            ))}
        </Container>
      </Container>
    )
  );
};

export default Episodes;
