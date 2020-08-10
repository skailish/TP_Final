import React, { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setData(dataJson.response);
    };
    getMovies();
  }, [category]);

  return (
    <MovieContext.Provider value={{ data, setCategory }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
export { MovieProvider };
