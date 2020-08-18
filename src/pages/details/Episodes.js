import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/primitive/Container";
import CardEpisodes from "pages/details/CardEpisodes";
import Span from "../../components/primitive/Span";

import ThemeContext from "../../contexts/ThemeContext";

const Episodes = ({ seasons }) => {
  const { TVId } = useParams();
  const [episodes, setEpisodes] = useState();
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [episodesLength, setEpisodesLength] = useState(0);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${TVId}/season/${seasonNumber}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();
      setEpisodes(dataJson.episodes);
      setEpisodesLength(dataJson.episodes.length);
    };
    getEpisodes();
  }, [seasonNumber]);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSeasonNumber(newValue);
  };

  const seasonsFilter = seasons.filter((season) => season.name !== "Specials");

  return (
    seasonsFilter &&
    TVId && (
      <Container className={`episodes-main-container ${theme}`}>
        <Container className="select-episodes-container">
          <select onChange={handleChange}>
            {seasonsFilter &&
              seasonsFilter.map((season, index) => (
                <option value={index + 1} key={season.id} id={season.id}>
                  Season {index + 1}
                </option>
              ))}
          </select>
          <Span>{episodesLength} Episodes</Span>
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
