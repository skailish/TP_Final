import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";

import Container from "../components/primitive/Container";
import Card from "./Card";
import Heading from "./primitive/Heading";
import Button from "./primitive/Button";

import ThemeContext from "../contexts/ThemeContext";
import FavsContext from "../contexts/FavsContext";

const CardListPreview = ({ mediatype, data, sectionTitle, category }) => {
  const { theme } = useContext(ThemeContext);
  const { favsArray } = useContext(FavsContext);
  const mediaRef = useRef(null);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const [screen, setScreen] = useState(0);
  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(true);

  useEffect(() => {
    setCarouselScroll(mediaRef.current.scrollWidth / 4);
  }, []);

  const handleLeftChevronClick = (carouselScroll, screen) => {
    mediaRef.current.scrollLeft = screen * carouselScroll - carouselScroll;
    setScreen(screen - 1);
    screen <= 1 && setShowLeftBar(false);
    screen <= 3 && setShowRightBar(true);
  };

  const handleRightChevronClick = (carouselScroll, screen) => {
    mediaRef.current.scrollLeft = Math.round(carouselScroll * (screen + 1));
    screen >= 0 && setShowLeftBar(true);
    setScreen(screen + 1);
    screen >= 2 && setShowRightBar(false);
  };

  return (
    data &&
    favsArray && (
      <Container className={`cardlistpreview-container ${theme} `}>
        {showLeftBar && (
          <Button
            className={`chevron-container chevron-left ${theme} `}
            onClick={() => handleLeftChevronClick(carouselScroll, screen)}
          >
            <ChevronLeft className={`chevron-icon ${theme} `} />
          </Button>
        )}
        <Container className="cardlistpreview-title">
          <Heading className={`cardlistpreview-heading ${theme} `} level={1}>
            {sectionTitle}
          </Heading>

          <Link
            to={`${mediatype}/category/${category}`}
            className={`cardlistpreview-link ${theme}`}
          >
            Explore All
          </Link>
        </Container>
        <Container
          className="media-container"
          id="media-container"
          forwarderRef={mediaRef}
        >
          {data &&
            favsArray &&
            data.map((singleCard) => (
              <Card
                id={singleCard.id}
                src={singleCard.poster_path}
                title={mediatype === "tv" ? singleCard.name : singleCard.title}
                votes={singleCard.vote_average}
                key={singleCard.id}
                mediatype={mediatype}
                like={favsArray.includes(singleCard.id)}
              />
            ))}
        </Container>
        {showRightBar && (
          <Button
            className={`chevron-container chevron-right ${theme} `}
            onClick={() => handleRightChevronClick(carouselScroll, screen)}
          >
            <ChevronRight className={`chevron-icon ${theme} `} />
          </Button>
        )}
      </Container>
    )
  );
};

export default CardListPreview;
