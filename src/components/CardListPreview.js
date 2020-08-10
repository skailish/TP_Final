import React, { useEffect, useContext } from "react";
import Cards from "./Cards";
import DataContext from "../contexts/DataContext";

const CardListPreview = () => {
  const { setMediaType, data, mediaType } = useContext(DataContext);

  return <div></div>;
};

export default CardListPreview;
