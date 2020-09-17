import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";
import useFetch from "../hooks/useFetch";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState();
  const [voteAverage, setVoteAverage] = useState(0);
  const [mediatype, setMediatype] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const pageRandom = Math.floor(Math.random() * 100) + 1;
  const indexRandom = Math.floor(Math.random() * 20);

  const dataJson = useFetch(
    `https://api.themoviedb.org/3/trending/all/day?page=${pageRandom}&api_key=${API_KEY}`,
    []
  );

  useEffect(() => {
    !dataJson && setIsLoading(true);
    dataJson && setData(dataJson.results[indexRandom]);

    if (
      dataJson &&
      (dataJson.results[indexRandom].release_date ||
        dataJson.results[indexRandom].first_air_date)
    ) {
      const date =
        dataJson.results[indexRandom].media_type === "movie"
          ? dataJson.results[indexRandom].release_date.split("-")[0]
          : dataJson.results[indexRandom].first_air_date.split("-")[0];
      setYear(date);
    } else {
      setYear("");
    }

    dataJson && setVoteAverage(dataJson.results[indexRandom].vote_average);
    dataJson && setMediatype(dataJson.results[indexRandom].media_type);
    dataJson && setIsLoading(false);
  }, [dataJson]);


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
