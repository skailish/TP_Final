import React, { useState, useContext } from "react";
import Stars from "./Stars";
import AverageVoteStars from "./AverageVoteStars";
import Container from "./primitive/Container"
import { Eye } from "@styled-icons/bootstrap/Eye";
import ThemeContext from "../contexts/ThemeContext";

const Votes = ({ contentName, voteAverage, voteNumber, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const [isRatingVisible, setIsRatingVisible] = useState(true);


  const handleClick = () => {
    setIsRatingVisible(!isRatingVisible);
  }

  return (

    <Container className={theme} {...props}>
      <AverageVoteStars voteAverage={voteAverage} />
      <Stars title={contentName} />
      {voteNumber && <span className="rating-number" onClick={handleClick}>{isRatingVisible ? voteNumber : <Eye />}</span>}
    </Container >

  )
};

export default Votes;