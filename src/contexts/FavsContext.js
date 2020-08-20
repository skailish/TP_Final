import React, { createContext, useState } from "react";
import firebase, { db } from "configs/firebase";

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
    console.log(favs);
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
          console.log(favs);
          setMoviesArray(favs);
          // setFavsArray([...moviesArray, ...seriesArray]);
        });
  };

  // const spreadArray = () => {

  // };

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
