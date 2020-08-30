import React, { useContext } from "react";

import { GithubSquare } from "@styled-icons/fa-brands/GithubSquare";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";

import Container from "./primitive/Container";
import Heading from "./primitive/Heading";
import Link from "./primitive/Link";
import Text from "./primitive/Text";

import ThemeContext from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const yearCopyright = new Date().getFullYear();

  return (
    <Container className={`footer-container ${theme}`}>
      <Container className={`footer-rights-container ${theme}`}>
        <Text>
          © {yearCopyright} Designed and built by Angie Turne - Daniela Capponi
          - Josefina del Rey - Luján Sanchez. All rights reserved.
        </Text>
        <Text>
          Data provided by{" "}
          <Link
            className={`footer-link ${theme}`}
            target="_blank"
            href="https://www.themoviedb.org/"
          >
            TMDb.
          </Link>
        </Text>
      </Container>
      <Container className="personal-data-container">
        <Container className="footer-container-personal">
          <Heading className={`footer-heading ${theme}`} level={3}>
            Daniela
          </Heading>

          <Container className="footer-icons-container">
            <Link target="_blank" href="https://gitlab.com/d-capponi">
              <GithubSquare className={`footer-icon github-icon ${theme}`} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/danielacapponi/"
            >
              <LinkedinSquare className={`footer-icon ${theme}`} />
            </Link>
          </Container>
        </Container>
        <Container className="footer-container-personal">
          <Heading className={`footer-heading ${theme}`} level={3}>
            Luján
          </Heading>

          <Container className="footer-icons-container">
            <Link target="_blank" href="https://github.com/LoohanZero">
              <GithubSquare className={`footer-icon github-icon ${theme}`} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/luján-sanchez-6493ba70/"
            >
              <LinkedinSquare className={`footer-icon ${theme}`} />
            </Link>
          </Container>
        </Container>
        <Container className="footer-container-personal">
          <Heading className={`footer-heading ${theme}`} level={3}>
            Angie
          </Heading>

          <Container className="footer-icons-container">
            <Link target="_blank" href="https://github.com/angieTu">
              <GithubSquare className={`footer-icon github-icon ${theme}`} />
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/in/angie-tu/">
              <LinkedinSquare
                className={`footer-icon ${theme}`}
                target="_blank"
                href=""
              />
            </Link>
          </Container>
        </Container>
        <Container className="footer-container-personal">
          <Heading className={`footer-heading ${theme}`} level={3}>
            Josefina
          </Heading>

          <Container className="footer-icons-container">
            <Link target="_blank" href="https://github.com/Jodelrey">
              <GithubSquare className={`footer-icon github-icon ${theme}`} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/josefina-del-rey/"
            >
              <LinkedinSquare className={`footer-icon ${theme}`} />
            </Link>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Footer;
