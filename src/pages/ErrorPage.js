import React from "react";
import { useHistory } from "react-router-dom";

import { Container, Heading, Link } from "../components";

const ErrorPage = () => {
  const history = useHistory();

  const onErrorClick = () => {
    history.push("/");
  };

  return (
    <Container className="error-container">
      <Container className="error-background-container" />
      <Container className="error-heading-container">
        <Heading className="error-heading">ERROR 404</Heading>

        <Container className="error-redirection-container">
          <Heading className="error-redirection" level={2}>
            Welcome to the Upside Down,
          </Heading>
          <Heading className="error-redirection" level={2}>
            go{" "}
            <Link className="error-link" onClick={onErrorClick}>
              Home
            </Link>{" "}
            or you wil end up like Will.
          </Heading>
        </Container>
      </Container>
    </Container>
  );
};

export default ErrorPage;
