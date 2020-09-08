import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";

const DiscoverContext = createContext();

const DiscoverProvider = ({ children }) => {
  const [mediaAdvance, setMediaAdvance] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [genresAdvance, setGenresAdvance] = useState("");
  const [years, setYears] = useState([]);
  const [interval, setInterval] = useState("after");
  const [orderBy, setOrderBy] = useState("popularity.desc");
  const [discover, setDiscover] = useState([]);
  const [chosenYear, setChosenYear] = useState("");
  const [yearEndPoint, setYearEndPoint] = useState("");
  const [discoverMaxPage, setDiscoverMaxPage] = useState(1000);
  const [discoverPage, setDiscoverPage] = useState(1);


  const areGenres = genresAdvance ? `&with_genres=${genresAdvance}` : "";

  const handleMediaChange = (event) => {
    setMediaAdvance(event.target.value);
  };

  const handleGenreChange = (event) => setGenresAdvance(event.target.value);

  const handleIntervalChange = (event) => setInterval(event.target.value);

  const handleYearChange = (event) => {
    setChosenYear(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const orderByYears = (
    setYearEndPoint,
    chosenYear,
    interval,
    mediaAdvance
  ) => {
    switch (interval) {
      case "before":
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&release_date.lte=${chosenYear}-01-01`);
        } else {
          setYearEndPoint(`&first_air_date.lte=${chosenYear}-01-01`);
        }

        break;
      case "exact":
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&primary_release_year=${chosenYear}`);
        } else {
          setYearEndPoint(`&first_air_date_year=${chosenYear}`);
        }

        break;
      default:
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&release_date.gte=${chosenYear}-01-01`);
        } else {
          setYearEndPoint(`&first_air_date.gte=${chosenYear}-01-01`);
        }
        break;
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${mediaAdvance}/list?api_key=${API_KEY}&language=en-US`
      );
      const dataJson = await response.json();
      setGenres(dataJson.genres);
      setGenresAdvance(false);
    };
    getGenres();
  }, [mediaAdvance]);

  useEffect(() => {
    const getYears = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=${API_KEY}&language=en-US&page=1&sort_by=${
          mediaAdvance === "movie" ? "release_date.asc" : "first_date_air.asc"
        }`
      );
      const dataJson = await response.json();
      const getFirstYear =
        mediaAdvance === "movie"
          ? dataJson.results
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )[0]
              .release_date.split("-")[0]
          : dataJson.results
              .filter(
                (serie) =>
                  serie.first_air_date !== undefined &&
                  serie.first_air_date !== ""
              )[0]
              .first_air_date.split("-")[0];

      const arrayLength = 2021 - Number(getFirstYear);
      const arrayYears = Array(arrayLength);
      const getArray = () => {
        for (let i = 0; i < arrayYears.length; i++) {
          arrayYears[i] = Number(getFirstYear) + i;
        }
        return arrayYears;
      };
      setYears(getArray());
      setChosenYear(Number(getFirstYear));
    };
    getYears();
  }, [mediaAdvance]);

  useEffect(() => {
    const areSortBy =
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`;

    const getResults = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=${API_KEY}&language=en-US${areGenres}${yearEndPoint}${areSortBy}&page=${discoverPage}`
      );
      const dataJson = await response.json();

      setDiscover(dataJson.results);
      setDiscoverMaxPage(dataJson.total_pages);
      orderByYears(setYearEndPoint, chosenYear, interval, mediaAdvance);
    };
    getResults();
  }, [
    yearEndPoint,
    areGenres,
    mediaAdvance,
    genresAdvance,
    orderBy,
    chosenYear,
    interval,
    discoverPage,
  ]);

  return (
    <DiscoverContext.Provider
      value={{
        discover,
        genres,
        years,
        interval,
        mediaAdvance,
        orderBy,
        genresAdvance,
        discoverMaxPage,
        handleIntervalChange,
        handleMediaChange,
        handleGenreChange,
        handleYearChange,
        handleOrderByChange,
        setDiscoverPage,
      }}
    >
      {children}
    </DiscoverContext.Provider>
  );
};

export default DiscoverContext;
export { DiscoverProvider };
