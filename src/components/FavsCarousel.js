import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";

import Container from "./primitive/Container";
import Card from "./Card";
import Heading from "./primitive/Heading";
import Button from "./primitive/Button";

import ThemeContext from "../contexts/ThemeContext";
import FavsContext from "../contexts/FavsContext";

const FavsCarousel = ({ mediatype, data, sectionTitle }) => {
  const { theme } = useContext(ThemeContext);
  const { favsArray } = useContext(FavsContext);
  const mediaRef = useRef(null);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const [screen, setScreen] = useState(0);
  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(true);

  useEffect(() => {
    setCarouselScroll(mediaRef.current.scrollWidth / data.length);
    setScreen(data.length);
  }, []);

  const handleLeftChevronClick = (carouselScroll, screen, data) => {
    mediaRef.current.scrollLeft = -250;
    // setScreen(screen - 1);
    // screen <= 1 && setShowLeftBar(false);
    // screen <= data && setShowRightBar(true);
  };

  const handleRightChevronClick = (carouselScroll, screen, data) => {
    mediaRef.current.scrollLeft = 250;
    // screen >= 0 && setShowLeftBar(true);
    // setScreen(screen + 1);
    // screen >= data && setShowRightBar(false);
  };

  return (
    data &&
    favsArray && (
      <Container className={`cardlistpreview-container ${theme} `}>
        {showLeftBar && (
          <Button
            className={`chevron-container chevron-left ${theme} `}
            onClick={() =>
              handleLeftChevronClick(carouselScroll, screen, data.length)
            }
          >
            <ChevronLeft className={`chevron-icon ${theme} `} />
          </Button>
        )}
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
                src={singleCard.src}
                title={singleCard.title}
                votes={singleCard.votes}
                key={singleCard.id}
                mediatype={mediatype}
                like={true}
              />
            ))}
        </Container>
        {showRightBar && (
          <Button
            className={`chevron-container chevron-right ${theme} `}
            onClick={() =>
              handleRightChevronClick(carouselScroll, screen, data.lenth)
            }
          >
            <ChevronRight className={`chevron-icon ${theme} `} />
          </Button>
        )}
      </Container>
    )
  );
};

export default FavsCarousel;
