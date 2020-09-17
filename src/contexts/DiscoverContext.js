import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";
import useFetch from "../hooks/useFetch";

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

  const getFirstYear = (dataYears, mediaAdvance) => {
    console.log(dataYears);
    console.log(mediaAdvance);
    if (!dataYears) {
      return "";
    } else {
      console.log(
        dataYears.results.filter(
          (serie) =>
            serie.first_air_date !== undefined && serie.first_air_date !== ""
        )[0]
      );
      return mediaAdvance === "movie"
        ? dataYears.results
            .filter(
              (movie) =>
                movie.release_date !== undefined && movie.release_date !== ""
            )[0]
            .release_date.split("-")[0]
        : dataYears.results
            .filter(
              (serie) =>
                serie.first_air_date !== undefined &&
                serie.first_air_date !== ""
            )[0]
            .first_air_date.split("-")[0];
    }
  };

  const getArray = (arrayYears, firstYear) => {
    for (let i = 0; i < arrayYears.length; i++) {
      arrayYears[i] = Number(firstYear) + i;
    }
    return arrayYears;
  };

  const dataGenres = useFetch(
    `https://api.themoviedb.org/3/genre/${mediaAdvance}/list?api_key=${API_KEY}&language=en-US`,
    [mediaAdvance]
  );

  const dataYears = useFetch(
    `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=${API_KEY}&language=en-US&page=1&sort_by=${
      mediaAdvance === "movie" ? "release_date.asc" : "first_date_air.asc"
    }`,
    [mediaAdvance]
  );

  const dataSortBy = useFetch(
    `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=${API_KEY}&language=en-US${areGenres}${yearEndPoint}${
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`
    }&page=${discoverPage}`,
    [
      yearEndPoint,
      areGenres,
      mediaAdvance,
      genresAdvance,
      orderBy,
      chosenYear,
      interval,
      discoverPage,
    ]
  );

  useEffect(() => {
    const firstYear = dataYears && getFirstYear(dataYears, mediaAdvance);
    const currentDate = new Date();
    const arrayLength =
      firstYear && currentDate.getFullYear() - Number(firstYear) + 1;
    const arrayYears = arrayLength && Array(arrayLength);
    dataYears && setYears(getArray(arrayYears, firstYear));
    dataYears && setChosenYear(Number(firstYear));
  }, [dataYears])

  useEffect(() =>  {
    dataGenres && setGenres(dataGenres.genres);
    dataGenres && setGenresAdvance(false);
  }, [dataGenres])


  useEffect(() => {
    dataSortBy && setDiscover(dataSortBy.results);
    dataSortBy && setDiscoverMaxPage(dataSortBy.total_pages);
    dataSortBy &&
      orderByYears(setYearEndPoint, chosenYear, interval, mediaAdvance);

    dataSortBy && setDiscover(dataSortBy.results);
    dataSortBy && setDiscoverMaxPage(dataSortBy.total_pages);
    dataSortBy &&
      orderByYears(setYearEndPoint, chosenYear, interval, mediaAdvance);
  }, [dataSortBy, mediaAdvance]);


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
