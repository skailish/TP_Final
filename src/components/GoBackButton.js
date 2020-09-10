import React, { useContext } from "react";
import { ArrowBack } from "@styled-icons/ionicons-outline/ArrowBack";
import { useHistory } from "react-router-dom";

import Container from "./primitive/Container";
import Button from "./primitive/Button";
import Text from "./primitive/Text";

import ThemeContext from "../contexts/ThemeContext";

const GoBackButton = () => {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const handleGoBackClick = () => {
    history.goBack();
  };
  return (
    <Container className={`go-back-container ${theme}`}>
      <Button onClick={handleGoBackClick} className={`go-back-button ${theme}`} tabindex="0" >
        <ArrowBack className={`arrow-icon ${theme}`} aria-hidden="true" />
        <Text className={`go-back-text ${theme}`}>Go Back</Text>
      </Button>
    </Container>
  );
};

export default GoBackButton;
