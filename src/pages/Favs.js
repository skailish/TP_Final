import React, { useEffect, useState } from "react";
import { db } from "../configs/firebase";

import Container from "../components/primitive/Container";
import Heading from "../components/primitive/Heading";
import CardListPreview from "../components/CardListPreview";

const Favs = ({ user }) => {
  const [favSeries, setFavSeries] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const getFavSeries = () => {
      db.collection("Favs")
        .doc(`${user.email}`)
        .collection("tv")
        .get()
        .then((snapshot) => console.log(snapshot.docs));
    };
    getFavSeries();
  }, [user]);

  return (
    <Container className="main-container">
      <Heading level={1}>Your Favorites</Heading>
      {favSeries && (
        <CardListPreview
          mediatype="tv"
          data={favSeries}
          sectionTitle="Favorites TV Shows"
        />
      )}
    </Container>
  );
};

export default Favs;
