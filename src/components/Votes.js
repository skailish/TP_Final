import React, { useState, useContext } from "react";

import { EyeFill } from "@styled-icons/bootstrap/EyeFill";

import AverageVoteStars from "./AverageVoteStars";
import Container from "./primitive/Container";

import ThemeContext from "../contexts/ThemeContext";

const Votes = ({ contentName, voteAverage, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const [isVotingNumberVisible, setIsVotingNumberVisible] = useState(true);

  const handleClick = () => {
    setIsVotingNumberVisible(!isVotingNumberVisible);
  };


  return (
    <Container className={`rating-container ${theme}`} {...props} onClick={handleClick}>
      { isVotingNumberVisible && (voteAverage || voteAverage === 0) && (        <>
        <AverageVoteStars voteAverage={ voteAverage > 0 ? voteAverage : 0}      />
        <span className={`rating-number ${theme}`} >
          { voteAverage }
          </span>
          </>        )
      }
      {!isVotingNumberVisible && (<><EyeFill/><span>Show rating</span></>)}
    </Container>
  );
};

export default Votes;
