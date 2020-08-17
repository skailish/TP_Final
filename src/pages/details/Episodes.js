import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/primitive/Container";
import CardEpisodes from "pages/details/CardEpisodes";

const Episodes = ({ seasons, id }) => {
  // const { TVId } = useParams();
  const [episodes, setEpisodes] = useState();
  const [seasonNumber, setSeasonNumber] = useState(1);

  useEffect(() => {
    const getEpisodes = async () => {
      console.log(id);
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();
      setEpisodes(dataJson.episodes);
    };
    getEpisodes();
    console.log(episodes);
  }, [seasonNumber]);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSeasonNumber(newValue);
  };

  return (
    seasons &&
    id && (
      <Container>
        <select onChange={handleChange}>
          {seasons &&
            seasons.map((season, index) => (
              <option value={index} key={season.id} id={season.id}>
                {season.name}
              </option>
            ))}
        </select>
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
    )
  );
};

export default Episodes;
