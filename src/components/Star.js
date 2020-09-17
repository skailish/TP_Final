import React from "react";
import { Star as EmptyStar } from "@styled-icons/fa-regular/Star";
import { Star as FilledStar } from "@styled-icons/fa-solid/Star";
import { StarHalfAlt as FilledHalf } from "@styled-icons/fa-solid/StarHalfAlt";

const Star = ({ type }) => {
  const STAR = {
    "empty" : <EmptyStar className="star" />,
    "half" : <FilledHalf className="star" />,
    "filled" : <FilledStar className="star" />,
  }
 
  return (
    <>
      {STAR[type]}     
    </>
  );
};

export default Star;
