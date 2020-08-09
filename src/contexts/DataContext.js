import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState();
  const [voteAverage, setVoteAverage] = useState(0);

  useEffect(() => {
    const getTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=d6798e588b7a270cba41fa64d417d9e7"
      );
      const dataJson = await response.json();
      setData(dataJson.results[0]);
      setYear(dataJson.results[0].release_date.split("-")[0]);
      setVoteAverage(dataJson.results[0].vote_average);
    };
    getTrending();
  }, []);

  return (
    <DataContext.Provider value={{ data, year, voteAverage }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataProvider };