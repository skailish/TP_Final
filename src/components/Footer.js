import React from "react";
import Container from "./primitive/Container";
import Heading from "./primitive/Heading";
import { GithubSquare } from "@styled-icons/fa-brands/GithubSquare";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
//import { Mail } from "@styled-icons/entypo/Mail";

const Footer = () => {
  return (
    <Container className="footer-container">
      <Container className="footer-container-personal">
        <Heading className="footer-heading" level={3}>
          Daniela
        </Heading>
        <Container className="footer-icons-container">
          <GithubSquare
            className="footer-icon github-icon"
            target="_blank"
            href="https://gitlab.com/d-capponi"
          />
          <LinkedinSquare
            className="footer-icon"
            target="_blank"
            href="https://www.linkedin.com/in/danielacapponi/"
          />
        </Container>
      </Container>
      <Container className="footer-container-personal">
        <Heading className="footer-heading" level={3}>
          Lujan
        </Heading>
        <Container className="footer-icons-container">
          <GithubSquare
            className="footer-icon github-icon"
            target="_blank"
            href="https://github.com/LoohanZero"
          />
          <LinkedinSquare
            className="footer-icon"
            target="_blank"
            href="https://www.linkedin.com/in/luján-sanchez-6493ba70/"
          />
        </Container>
      </Container>
      <Container className="footer-container-personal">
        <Heading className="footer-heading" level={3}>
          Angie
        </Heading>
        <Container className="footer-icons-container">
          <GithubSquare
            className="footer-icon github-icon"
            target="_blank"
            href="https://github.com/angieTu"
          />
          <LinkedinSquare className="footer-icon" target="_blank" href="" />
        </Container>
      </Container>
      <Container className="footer-container-personal">
        <Heading className="footer-heading" level={3}>
          Josefina
        </Heading>
        <Container className="footer-icons-container">
          <GithubSquare
            className="footer-icon github-icon"
            target="_blank"
            href="https://github.com/Jodelrey"
          />
          <LinkedinSquare
            className="footer-icon"
            target="_blank"
            href="https://www.linkedin.com/in/josefina-del-rey/"
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Footer;
