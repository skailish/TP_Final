// import React, { createContext, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const SerieContext = createContext();

// const SerieProvider = ({ children }) => {
//   const [dataTVShowID, setDataTVShowID] = useState([]);
//   const [year, setYear] = useState(0);
//   const [voteAverage, setVoteAverage] = useState(0);
//   const [similarShows, setSimilarShows] = useState([]);

//   useEffect(() => {
//     const getTVShowID = async () => {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/tv/${TVId}?api_key=d6798e588b7a270cba41fa64d417d9e7`
//       );
//       const dataJson = await response.json();
//       setDataTVShowID(dataJson);
//       setYear(dataJson.first_air_date.split("-")[0]);
//       setVoteAverage(dataJson.vote_average);
//     };
//     getTVShowID();
//   }, []);

//   useEffect(() => {
//     // const pageRandom = Math.floor(Math.random() * 100) + 1;
//     const getSimilarShows = async () => {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/tv/${TVId}/similar?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=1`
//       );
//       const dataJson = await response.json();
//       setSimilarShows(dataJson.results);
//     };
//     getSimilarShows();
//   }, []);

//   return (
//     <SerieContext.Provider
//       value={{ dataTVShowID, year, voteAverage, similarShows }}
//     >
//       {children}
//     </SerieContext.Provider>
//   );
// };

// export default SerieContext;
// export { SerieProvider };
