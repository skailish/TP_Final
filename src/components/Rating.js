import React from "react";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarHalf } from "@styled-icons/bootstrap/StarHalf";
import { StarFill } from "@styled-icons/bootstrap/StarFill";

const Rating = ({ voteAverage }) => {
  const rating = Math.round(voteAverage) / 2;
  const odd = rating % 2 !== 0 && rating !== 5;

  const arrayFullStar = Array(Math.floor(rating)).fill(" ");
  const halfStar = odd && <StarHalf className="rating-icon" />;

  const emptyStarCount = 5 - arrayFullStar.length - (odd ? 1 : 0);
  const arrayEmpty = emptyStarCount > 0 && Array(emptyStarCount).fill(" ");
  console.log(arrayEmpty);
  return (
    <div>
      {arrayFullStar.map(() => (
        <StarFill className="rating-icon" />
      ))}
      {halfStar}
      {arrayEmpty && arrayEmpty.map(() => <Star className="rating-icon" />)}
    </div>
  );
};

export default Rating;
