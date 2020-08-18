import React, { createContext, useState } from "react";

const FavsContext = createContext();
const FavsProvider = ({ children }) => {
  const [favsArray, setFavsArray] = useState([]);

  return (
    <FavsContext.Provider value={{ favsArray, setFavsArray }}>
      {children}
    </FavsContext.Provider>
  );
};

export default FavsContext;
export { FavsProvider };
