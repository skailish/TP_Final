import React from "react";
import { Star as EmptyStar } from "@styled-icons/fa-regular/Star";
import { Star as FilledStar } from "@styled-icons/fa-solid/Star";
import { StarHalfAlt as FilledHalf } from "@styled-icons/fa-solid/StarHalfAlt";

const Star = ({ type }) => {
  const STAR = {
    "half" : <FilledHalf className="star" />,
    "filled" : <FilledStar className="star" />,
    "empty" : <EmptyStar className="star" />
  }
  return (
    <>
      {STAR[type]}     
    </>
  );
};

export default Star;
