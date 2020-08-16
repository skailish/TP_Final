import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/primitive/Container";
import CardEpisodes from "pages/details/CardEpisodes";

const Episodes = (seasons, id) => {
  // const { TVId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState(0);

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
    setSeasonNumber(Number(event.target.value));
  };

  return (
    seasons.seasons && (
      <Container>
        <select onChange={handleChange}>
          {seasons.seasons &&
            seasons.seasons.map((season, index) => (
              <option value={index} key={season.id} id={index}>
                {season.name}
              </option>
            ))}
        </select>
        {episodes &&
          episodes.map((episode, id) => (
            <CardEpisodes
              key={id}
              src={episode.still_path}
              episode={episode.episode_number}
              title={episode.name}
              overview={episode.overview}
              date={episode.air_date}
            ></CardEpisodes>
          ))}
      </Container>
    )
  );
};

export default Episodes;
