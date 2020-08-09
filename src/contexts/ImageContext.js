import React, { createContext } from "react";

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <ImageContext.Provider value={{ imageBaseUrl }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider };
export default ImageContext;
