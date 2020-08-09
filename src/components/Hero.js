import React, { useState, useEffect, useContext } from "react";
import ImageContext from "../contexts/ImageContext";

const Hero = () => {
  const [data, setData] = useState([123]);
  const { imageBaseUrl } = useContext(ImageContext);

  useEffect(() => {
    const getTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=d6798e588b7a270cba41fa64d417d9e7"
      );
      const dataJson = await response.json();
      setData(dataJson.results[0]);
    };
    getTrending();
  }, []);

  return (
    data && (
      <>
        <header className="hero-container">
          {console.log(`url(${imageBaseUrl}${data.backdrop_path})`)}
          <div
            className="hero-background-image"
            style={{
              backgroundImage: `url(${imageBaseUrl}${data.backdrop_path})`,
            }}
          ></div>
          <div className="hero-details"></div>
        </header>
      </>
    )
  );
};

export default Hero;
