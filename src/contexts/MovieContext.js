import React, { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [dataMovie, setDataMovie] = useState([]);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=1&api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataMovie(dataJson.results);
    };
    getMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ dataMovie, setCategory }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
export { MovieProvider };
