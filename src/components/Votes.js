import React, { useState, useContext } from "react";
import Stars from "./Stars";
import AverageVoteStars from "./AverageVoteStars";
import Container from "./primitive/Container"
import { Eye } from "@styled-icons/bootstrap/Eye";
import ThemeContext from "../contexts/ThemeContext";

const Votes = ({ contentName, voteAverage, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const [isVotingNumberVisible, setIsVotingNumberVisible] = useState(true);
  const [isRatingVisible, setIsRatingVisible] = useState(true);


  const handleClick = () => {
    setIsVotingNumberVisible(!isVotingNumberVisible);
  }

  const handleOnMouseEnter = () => setIsRatingVisible(false)
  const handleOnMouseLeave = () => setIsRatingVisible(true)

  return (
    <Container className={`rating-container ${theme}`} {...props}>
      <Container onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} >
        {(voteAverage &&
          <AverageVoteStars voteAverage={voteAverage} showRating={isRatingVisible} />
        )}
        <Stars title={contentName} showStars={!isRatingVisible} />
      </Container>
      {voteAverage && <span className={`rating-number ${theme}`} onClick={handleClick}>{isVotingNumberVisible ? voteAverage : <Eye />}</span>}
    </Container >

  )
};

export default Votes;