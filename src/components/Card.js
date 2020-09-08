import React, { useContext, useState } from "react";
import imageBaseUrl from "../utils/ImageBaseUrl";
import { db } from "../configs/firebase";
import { useHistory } from "react-router-dom";

import { Heart } from "@styled-icons/entypo/Heart";
import { HeartBroken } from "@styled-icons/fa-solid/HeartBroken";

import Container from "./primitive/Container";
import Votes from "./Votes";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import noPosterFound from "../images/404PosterNotFound.jpg";

import ThemeContext from "../contexts/ThemeContext";
import UserContext from "../contexts/UserContext";

import FavsContext from "../contexts/FavsContext";

const Card = ({ id, src, title, votes, mediatype, like }) => {
  const [fav, setFav] = useState(false);
  const [previousFav, setPreviousFav] = useState("");
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const {
    favsArray,
    setFavsArray,
    updateSeriesFavs,
    updateMovieFavs,
  } = useContext(FavsContext);

  const handleMediaDetailsClick = (id, mediatype) => {
    history.push(`/${mediatype}/${id}/info`);
  };

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
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediatype={mediatype}
    >
      <Container onClick={() => handleMediaDetailsClick(id, mediatype)}>
        <Image
          src={src ? `${imageBaseUrl}${src}` : noPosterFound}
          className="media-card-img"
          alt={`Image showing poster of "${title}"`}
        />
        <Container className="media-card-heading-container">
          <Heading level={3} className={`media-card-heading ${theme} `}>
            {title}
          </Heading>
        </Container>
      </Container>
      <Container className="votes-and-favs-container">
        {title && <Votes contentName={title} voteAverage={votes} />}
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
      </Container>
    </Container>
  );
};

export default Card;
