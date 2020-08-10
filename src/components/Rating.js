import React, { useContext } from "react";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarHalf } from "@styled-icons/bootstrap/StarHalf";
import { StarFill } from "@styled-icons/bootstrap/StarFill";

import ThemeContext from "../contexts/ThemeContext";

const Rating = ({ voteAverage, voteNumber }) => {
  const { theme } = useContext(ThemeContext);

  const rating = Math.round(voteAverage) / 2;
  const odd = rating % 2 !== 0 && rating !== 5;

  const arrayFullStar = Array(Math.floor(rating)).fill(" ");
  const halfStar = odd && <StarHalf className={`rating-icon ${theme}`} />;

  const emptyStarCount = 5 - arrayFullStar.length - (odd ? 1 : 0);
  const arrayEmpty = emptyStarCount > 0 && Array(emptyStarCount).fill(" ");

  return (
    <div>
      <div>
        {arrayFullStar.map(() => (
          <StarFill className={`rating-icon ${theme}`} />
        ))}
        {halfStar}
        {arrayEmpty &&
          arrayEmpty.map(() => <Star className={`rating-icon ${theme}`} />)}
      </div>
      {voteNumber && <span>{voteNumber}</span>}
    </div>
  );
};

export default Rating;
