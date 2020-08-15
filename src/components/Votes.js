import React, { useContext } from "react";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import Rating from "react-rating";
import ThemeContext from "../contexts/ThemeContext";

const Votes = ({ voteAverage, voteNumber, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const rating = voteAverage / 2;

  return (
    <div {...props}>
      <Rating
        emptySymbol={<Star className={`rating-stars ${theme}`} />}
        placeholderSymbol={<StarFill className={`rating-stars ${theme}`} />}
        fullSymbol={<StarFill className={`rating-stars ${theme}`} />}
        placeholderRating={rating}
        fractions={2}
      />
      {(voteNumber || voteNumber === 0) && <span className="rating-number">{voteNumber}</span>}
    </div>
  );
};

export default Votes;
