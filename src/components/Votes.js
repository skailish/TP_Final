import React, { useState, useContext } from "react";

import { Eye } from "@styled-icons/bootstrap/Eye";

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
    <Container className={`rating-container ${theme}`} {...props}>

        <AverageVoteStars
          voteAverage={voteAverage}
        />

      {voteAverage && (
        <span className={`rating-number ${theme}`} onClick={handleClick}>
          {isVotingNumberVisible ? voteAverage : <Eye />}
        </span>
      )}
    </Container>
  );
};

export default Votes;
