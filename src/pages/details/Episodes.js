import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/primitive/Container";
import CardEpisodes from "pages/details/CardEpisodes";
import Span from "../../components/primitive/Span";

const Episodes = ({ seasons, id }) => {
  // const { TVId } = useParams();
  const [episodes, setEpisodes] = useState();
  const [seasonNumber, setSeasonNumber] = useState(1);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();
      setEpisodes(dataJson.episodes);
    };
    getEpisodes();
  }, [seasonNumber]);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSeasonNumber(newValue);
  };

  const filterSeasons = (season) => season.name !== "Specials";
  // const result = seasons.filter((season) => season.name !== "Specials");

  return (
    seasons &&
    id && (
      <Container className="episodes-main-container">
        <Container className="select-episodes-container">
          <select onChange={handleChange}>
            {seasons &&
              seasons.filter(filterSeasons).map((season, index) => (
                <option value={index + 1} key={season.id} id={season.id}>
                  {season.name}
                </option>
              ))}
          </select>
          <Span>{seasons.length - 1} Seasons</Span>
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
