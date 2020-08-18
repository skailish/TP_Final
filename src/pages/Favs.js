import React, { useEffect, useState, useContext } from "react";
import { db } from "../configs/firebase";
import ThemeContext from "../contexts/ThemeContext";
import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import Card from "../components/Card";

const Favs = ({ user }) => {
  const [favSeries, setFavSeries] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getFavSeries = () => {
      db.collection("Favs")
        .doc(`${user.email}`)
        .collection("tv")
        .get()
        .then((response) => {
          const series = [];
          response.forEach((document) => {
            const serie = {
              ...document.data(),
            };
            series.push(serie);
          });
          setFavSeries(series);
          window.localStorage.setItem("favs", series);
        });
    };

    getFavSeries();
  }, [user]);

  return (
    <Container className={`main-favs-container ${theme}`}>
      <Heading level={1} className={`favs-heading ${theme}`}>
        Your Favorites
      </Heading>
      <Container className={`favs-cards-container ${theme}`}>
        {favSeries &&
          favSeries.map((serie) => (
            <Card
              key={serie.id}
              id={serie.id}
              src={serie.src}
              title={serie.title}
              votes={serie.votes}
              mediatype={serie.mediatype}
            />
          ))}
      </Container>
    </Container>
  );
};

export default Favs;
