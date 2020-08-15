import React, { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import Image from "../components/primitive/Image";
import img from "../images/Error.png";
import ThemeContext from "../contexts/ThemeContext";

const Trailer = () => {
  const [url, setUrl] = useState([]);
  const { media, id } = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getVideo = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US`
      );
      const dataJson = await response.json();

      const getKey = dataJson.results.filter((i) => i.type === "Trailer");

      setUrl(getKey);
    };
    getVideo();
  }, []);

  return url.length !== 0 && url !== undefined ? (
    <Container className="main-trailer-container">
      {console.log(url[0].key)}
      <Container className="player-container">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${url[0].key}`}
          width="100%"
          height="100%"
          controls
          onReady
          volume="0.5"
        />
      </Container>
    </Container>
  ) : (
    <Container className={`main-error-container ${theme}`}>
      <Image src={img} className="error-img" />
      <Heading classname={`error-trailer-heading ${theme}`} level={1}>
        ...Ups this {media} doesn´t have a trailer
      </Heading>
    </Container>
  );
};

export default Trailer;
