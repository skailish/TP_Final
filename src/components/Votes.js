import React from "react";
import Star from "../components/Star";

const Votes = ({ voteAverage }) => {
  const stars = Math.floor(((voteAverage * 10) / 5 / 2));
  const filledStars = [];
  for (let i = 0; i < (stars / 2); i++) {
    filledStars.push(<Star type={'filled'} key={i} />)
  }
  console.log(stars);
  const emptyStars = [];
  for (i; i < 5; i++) {
    emptyStars.push(<Star type={'empty'} key={i} />)
  }

    
      <input type="radio" name="rating" value="2"><i></i>
        <input type="radio" name="rating" value="3"><i></i>
          <input type="radio" name="rating" value="4"><i></i>
            <input type="radio" name="rating" value="5"><i></i>



  return (
    <div className={"rating"}>
      {filledStars.map(() => <Star type={'filled'} />)}
      <Star type={'average'} voteAverage={voteAverage / 2} />
      {emptyStars.map(() => <Star type={'empty'} />)}
    </div>
  )
};

export default Votes;
