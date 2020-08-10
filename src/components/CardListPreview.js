import React, { useEffect, useContext } from "react";
import Card from "./Card";
import MovieContext from "../contexts/MovieContext";

const CardListPreview = ({ mediaType, category }) => {
  const { data, setCategory } = useContext(MovieContext);
  setCategory(category);

  return (
    <>
      {data &&
        data.map((data) => (
          <Card
            id={data.id}
            src={data.poster_path}
            title={
              mediaType === "tv" ? data.original_name : data.original_title
            }
            votes={data.vote_average}
            key={data.id}
          />
        ))}
    </>
  );
};

export default CardListPreview;
