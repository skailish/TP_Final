import React, { useContext, useState } from "react";
import { Heart } from "@styled-icons/entypo/Heart";
import { HeartBroken } from "@styled-icons/fa-solid/HeartBroken";
import { db } from "../configs/firebase";

import Container from "./primitive/Container";

import UserContext from "../contexts/UserContext";
import FavsContext from "../contexts/FavsContext";
import ThemeContext from "../contexts/ThemeContext";

const FavIconToggle = ({ like, id, src, title, votes, mediatype }) => {
  const [fav, setFav] = useState(false);
  const [previousFav, setPreviousFav] = useState("");
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const {
    favsArray,
    setFavsArray,
    updateSeriesFavs,
    updateMovieFavs,
  } = useContext(FavsContext);

  const handleFavClick = (id, src, title, votes, mediatype, user) => {
    if (id === previousFav) {
      return;
    }
    setFav(true);

    db.collection("Favs")
      .doc(user.email)
      .collection(`${mediatype}`)
      .add({
        id: id,
        src: src,
        title: title,
        votes: votes,
        mediatype: mediatype,
      })
      .then(() => {
        const newFavs = [...favsArray, id];
        setFavsArray(newFavs);
        setPreviousFav(id);
      });
  };

  const handleBreakFavClick = (id, like) => {
    setFav(false);
    like = false;

    let selectedID = "";
    db.collection("Favs")
      .doc(user.email)
      .collection(`${mediatype}`)
      .get()
      .then((response) => {
        const docSelected = response.docs.filter(
          (document) => document.data().id === id
        );

        if (!docSelected[0]) {
          return;
        }
        selectedID = docSelected[0].id;
        const index = favsArray.indexOf(id);
        const newArray = [...favsArray];
        newArray.splice(index, 1);
        setFavsArray(newArray);
      })
      .then(() => {
        deleteFav(selectedID);
      });
  };

  const deleteFav = (id) => {
    if (!id) {
      return;
    }

    db.collection("Favs")
      .doc(user.email)
      .collection(`${mediatype}`)
      .doc(id)
      .delete()
      .then(() => {
        updateSeriesFavs(user);
        updateMovieFavs(user);
      });
  };

  return (
    <>
      {user && favsArray && (
        <Container className="heart-icons-container">
          {(fav || like) && (
            <HeartBroken
              className="fav-heart-broken favAdd"
              onClick={() => handleBreakFavClick(id, like)}
            />
          )}
          {!like && (
            <Heart
              className={`fav-heart ${fav && "favAdd"} ${theme}`}
              onClick={() =>
                handleFavClick(id, src, title, votes, mediatype, user)
              }
            />
          )}
        </Container>
      )}
    </>
  );
};

export default FavIconToggle;
