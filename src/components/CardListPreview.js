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
    console.log(widthScreen);
    mediaRef.current.scrollLeft -= widthScreen - 20;
    mediaRef.current.scrollLeft <= widthScreen && setShowLeftBar(false);
    setShowRightBar(true);
  };

  const handleRightChevronClick = (widthScreen, scrollWidth) => {
    mediaRef.current.scrollLeft += widthScreen - 120;
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
          className={`media-container ${theme}`}
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
            onClick={() => handleRightChevronClick(widthScreen, scrollWidth)}
          >
            <ChevronRight className={`chevron-icon ${theme} `} />
          </Button>
        )}
      </Container>
    )
  );
};

export default CardListPreview;
