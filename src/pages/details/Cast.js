import React, { useContext } from "react";

import {Container, CardCast} from "../../components"

import ThemeContext from "../../contexts/ThemeContext";

const Cast = ({ data, mediatype }) => {
  const { theme } = useContext(ThemeContext);

  return (
    data && (
      <Container className={`cast-container ${theme}`}>
        {data &&
          data.map((singleCard) => (
            <CardCast
              id={singleCard.id}
              mediatype={mediatype}
              src={singleCard.profile_path}
              name={singleCard.name}
              character={singleCard.character}
            ></CardCast>
          ))}
      </Container>
    )
  );
};

export default Cast;
