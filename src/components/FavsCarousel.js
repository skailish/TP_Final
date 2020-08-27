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
  const mediaContainerRef = useRef(null);
  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(true);
  const [widthScreen, setWidthScreen] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    setWidthScreen(mediaContainerRef.current.scrollWidth);
    setScrollWidth(mediaRef.current.scrollWidth);
  }, []);

  const handleLeftChevronClick = (widthScreen) => {
    mediaRef.current.scrollLeft -= widthScreen;
    mediaRef.current.scrollLeft <= widthScreen && setShowLeftBar(false);
    setShowRightBar(true);
  };

  const handleRightChevronClick = (widthScreen, scrollWidth) => {
    mediaRef.current.scrollLeft += widthScreen;
    mediaRef.current.scrollLeft >= scrollWidth - widthScreen * 2 &&
      setShowRightBar(false);
    setShowLeftBar(true);
  };

  return (
    data &&
    favsArray && (
      <Container
        className={`cardlistpreview-container ${theme} `}
        forwarderRef={mediaContainerRef}
      >
        {showLeftBar && (
          <Button
            className={`chevron-container chevron-left ${theme} `}
            onClick={() => handleLeftChevronClick(widthScreen)}
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
        {console.log(widthScreen, scrollWidth)}
        {showRightBar && widthScreen - scrollWidth < 60 && (
          <Button
            className={`chevron-container chevron-right ${theme} `}
            onClick={() => handleRightChevronClick(widthScreen, scrollWidth)}
          >
            <ChevronRight className={`chevron-icon ${theme} `} />
          </Button>
        )}
      </Container>
    )
  );
};

export default FavsCarousel;
