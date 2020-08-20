import React, { useEffect, useState, useContext } from "react";
import { db } from "../configs/firebase";
import ThemeContext from "../contexts/ThemeContext";
import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import Card from "../components/Card";

const Favs = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getFavs = () => {
      let favs = [];
      db.collection("Favs")
        .doc(`${user.email}`)
        .collection("tv")
        .get()
        .then((response) => {
          response.docs.map((document) => {
            const fav = {
              ...document.data(),
            };
            favs.push(fav);
          });
        });
      db.collection("Favs")
        .doc(`${user.email}`)
        .collection("movie")
        .get()
        .then((response) => {
          response.docs.map((document) => {
            const fav = {
              ...document.data(),
            };
            favs.push(fav);
          });
        });
      setFavorites(favs);
      console.log(favs);
    };

    getFavs();
  }, [user]);

  return (
    favorites.length > 0 && (
      <Container className={`main-favs-container ${theme}`}>
        <Heading level={1} className={`favs-heading ${theme}`}>
          Your Favorites
        </Heading>
        <Container className={`favs-cards-container ${theme}`}>
          {favorites.map((fav) => (
            <Card
              key={fav.id}
              id={fav.id}
              src={fav.src}
              title={fav.title}
              votes={fav.votes}
              mediatype={fav.mediatype}
              like={true}
            />
          ))}
          {console.log(favorites)}
        </Container>
      </Container>
    )
  );
};

export default Favs;
