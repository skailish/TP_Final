import React, { useContext, useState } from "react";
import { db } from "../configs/firebase";
import Container from "./primitive/Container";
import Votes from "./Votes";
import Heading from "./primitive/Heading";
import Image from "./primitive/Image";
import ImageContext from "../contexts/ImageContext";
import { useHistory } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import noPosterFound from "../images/404PosterNotFound.jpg";
import UserContext from "../contexts/UserContext";
import { Heart } from "@styled-icons/entypo/Heart";
import { HeartBroken } from "@styled-icons/fa-solid/HeartBroken";
import FavsContext from "../contexts/FavsContext";

const Card = ({ id, src, title, votes, mediatype, like }) => {
  const [fav, setFav] = useState(false);
  const { imageBaseUrl } = useContext(ImageContext);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { favsArray, setFavsArray } = useContext(FavsContext);

  const handleMediaDetailsClick = (id, mediatype) => {
    history.push(`/${mediatype}/${id}`);
  };

  const handleFavClick = (id, src, title, votes, mediatype, user) => {
    setFav(true);
    db.collection("Favs").doc(user.email).collection(`${mediatype}`).add({
      id: id,
      src: src,
      title: title,
      votes: votes,
      mediatype: mediatype,
    });
  };

  const handleBreakFavClick = (id) => {
    let selectedID = "";
    setFav(false);
    db.collection("Favs")
      .doc(user.email)
      .collection(`${mediatype}`)
      .get()
      .then((response) => {
        response.forEach((document) => {
          if (document.data().id === id) {
            selectedID = document.id;
          }
          console.log(selectedID);
        });
      })
      .then(() => {
        deleteFav(selectedID);
        const index = favsArray.indexOf(id);
        const newArray = favsArray.splice(index, 1);
        setFavsArray(newArray);
      });
  };

  const deleteFav = (id) => {
    db.collection("Favs")
      .doc(user.email)
      .collection(`${mediatype}`)
      .doc(id)
      .delete();
  };

  // useEffect(() => {
  //   window.localStorage.getItem("favs");
  // }, []);

  return (
    <Container
      id={id}
      key={id}
      as="article"
      className="media-card"
      mediatype={mediatype}
    >
      <div onClick={() => handleMediaDetailsClick(id, mediatype)}>
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
      </div>
      <Container className="votes-and-favs-container">
        <Votes
          voteAverage={votes}
          voteNumber={votes}
          className={`media-card-rating ${theme} `}
        />
        {user && window.localStorage && (
          <Container className="heart-icons-container">
            {(fav || like) && (
              <HeartBroken
                className="fav-heart-broken"
                onClick={() => handleBreakFavClick(id)}
              />
            )}
            <Heart
              className={`fav-heart ${fav && "favAdd"} ${like && "favAddLike"}`}
              onClick={() =>
                handleFavClick(id, src, title, votes, mediatype, user)
              }
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Card;
