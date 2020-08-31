import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState();
  const [voteAverage, setVoteAverage] = useState(0);
  const [mediatype, setMediatype] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true);
      const pageRandom = Math.floor(Math.random() * 100) + 1;
      const indexRandom = Math.floor(Math.random() * 20);

      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?page=${pageRandom}&api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setData(dataJson.results[indexRandom]);

      if (
        dataJson.results[indexRandom].release_date ||
        dataJson.results[indexRandom].first_air_date
      ) {
        const date =
          dataJson.results[indexRandom].media_type === "movie"
            ? dataJson.results[indexRandom].release_date.split("-")[0]
            : dataJson.results[indexRandom].first_air_date.split("-")[0];
        setYear(date);
      } else {
        setYear("");
      }

      setVoteAverage(dataJson.results[indexRandom].vote_average);
      setMediatype(dataJson.results[indexRandom].media_type);
      setIsLoading(false);
    };
    getTrending();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, year, voteAverage, mediatype, isLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataProvider };
