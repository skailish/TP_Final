import React, { createContext, useState, useEffect } from "react";
import { db } from "configs/firebase";

const FavsContext = createContext();
const FavsProvider = ({ children }) => {
  const [favsArray, setFavsArray] = useState([]);
  const [moviesArray, setMoviesArray] = useState([]);
  const [seriesArray, setSeriesArray] = useState([]);

  const updateSeriesFavs = (user) => {
    let favs = [];
    user &&
      db
        .collection("Favs")
        .doc(`${user.email}`)
        .collection("tv")
        .get()
        .then((response) => {
          response.forEach((document) => {
            favs.push(document.data());
          });
          setSeriesArray(favs);
        });
  };

  const updateMovieFavs = (user) => {
    let favs = [];
    user &&
      db
        .collection("Favs")
        .doc(`${user.email}`)
        .collection("movie")
        .get()
        .then((response) => {
          response.forEach((document) => {
            favs.push(document.data());
          });

          setMoviesArray(favs);
        });
  };

  useEffect(() => {
    const array = [];
    moviesArray.map((movie) => array.push(movie.id));
    seriesArray.map((serie) => array.push(serie.id));
    setFavsArray(array);
  }, [moviesArray, seriesArray]);

  return (
    <FavsContext.Provider
      value={{
        moviesArray,
        seriesArray,
        favsArray,
        setFavsArray,
        updateSeriesFavs,
        updateMovieFavs,
      }}
    >
      {children}
    </FavsContext.Provider>
  );
};

export default FavsContext;
export { FavsProvider };
