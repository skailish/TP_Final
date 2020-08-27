import React from "react";
import { Star as EmptyStar } from "@styled-icons/fa-regular/Star";
import { Star as FilledStar } from "@styled-icons/fa-solid/Star";
import { StarHalfAlt as FilledHalf } from "@styled-icons/fa-solid/StarHalfAlt";
import { StarHalf as HalfFilled } from "@styled-icons/fa-solid/StarHalf";
import { StarHalf as HalfEmpty } from "@styled-icons/fa-regular/StarHalf";

const Star = ({ type }) => {
  return (
    <>
      {type === "half" && <FilledHalf className={"star"} />}
      {type === "filled" && <FilledStar className={"star"} />}
      {type === "empty" && <EmptyStar className={"star"} />}
      {type === "half-empty" && <HalfEmpty className={"star"} />}
      {type === "half-filled" && <HalfFilled className={"star"} />}
    </>
  );
};

export default Star;
