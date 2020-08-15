import React from "react";

import { useParams } from "react-router-dom";

import Container from "../../components/primitive/Container";
import Image from "../../components/primitive/Image";

const Overview = () => {
  return (
    <Container className="main-container">
      <Container className="img-container-serie"></Container>
      <Container className="info-container-serie"></Container>
    </Container>
  );
};

export default Overview;
