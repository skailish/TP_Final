import React, { useContext } from "react";

import { Container, Text } from "../components";
import ThemeContext from "../contexts/ThemeContext";

const Modal = ({ text }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Container className="background-blurred" />
      <Container className={`modal-container`}>
        <Text className={`modal-text`}>{text}</Text>
      </Container>
    </>
  );
};

export default Modal;
