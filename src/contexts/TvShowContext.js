import React, { createContext, useState, useEffect } from "react";

const TvShowContext = createContext();

const TvShowProvider = ({ children }) => {
  const [dataTvShow, setDataTvShow] = useState([]);

  useEffect(() => {
    const getTvShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataTvShow(dataJson.results);
      console.log(dataTvShow);
    };
    getTvShows();
  }, []);

  return (
    <TvShowContext.Provider value={{ dataTvShow }}>
      {children}
    </TvShowContext.Provider>
  );
};

export default TvShowContext;
export { TvShowProvider };
