import React, { useContext } from "react";
import Star from "../components/Star";
import ThemeContext from "../contexts/ThemeContext";

const Votes = ({ voteAverage, voteNumber, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const rating = Math.floor(voteAverage / 2);
  const filledStars = [];
  for (let i = 0; i < rating; i++) {
    filledStars.push(' ')
  }
  const emptyStars = [];
  for (let x = (rating + 1); x < 5; x++) {
    console.log(`rating ${rating}`)
    console.log(x);
    emptyStars.push(' ')
  }
  return (
    <div {...props}>
      <div className={"rating-stars"}>
        {filledStars.map(() => <Star classname={`${theme}`} type={'filled'} />)}
        <Star classname={`${theme}`} type={'half'} />
        {emptyStars.map(() => <Star classname={`${theme}`} type={'empty'} />)}
      </div>
      {voteNumber && <span className="rating-number">{voteNumber}</span>}
    </div >

  )
};

export default Votes;
