import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../components/primitive/Container";
import Card from "./Card";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import Heading from "./primitive/Heading";
import Span from "./primitive/Span";
import Link from "./primitive/Link";
import ThemeContext from "../contexts/ThemeContext";

const SLIDER_SCREEN = {
  1: "screen1",
  2: "screen2",
  3: "screen3",
  4: "screen4",
};

const CardListPreview = ({ mediaType, data, sectionTitle, category }) => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const [carouselMove, setCarouselMove] = useState(1);

  const handleExploreAllClick = (type, category) => {
    history.push(`/${type}/category/${category}`);
  };

  const handleSliderClick = (direction) => {
    const number = direction === "right" ? +1 : -1;
    setCarouselMove(number);
  };

  return (
    data && (
      <Container className={`cardlistpreview-container ${theme} `}>
        <Container className="cardlistpreview-title">
          <Heading className={`cardlistpreview-heading ${theme} `} level={1}>
            {sectionTitle}
          </Heading>
          <Span>
            <Link
              className={theme}
              onClick={() => handleExploreAllClick(mediaType, category)}
            >
              Explore All
            </Link>
          </Span>
        </Container>
        <Container className={`chevron-container chevron-left ${theme} `}>
          <Link className="chevron-link">
            <ChevronLeft
              className={`chevron-icon ${theme} `}
              onClick={() => handleSliderClick("left")}
            />
          </Link>
        </Container>
        <Container className={`chevron-container chevron-right ${theme} `}>
          <Link className="chevron-link">
            <ChevronRight
              className={`chevron-icon ${theme} `}
              onClick={() => handleSliderClick("right")}
            />
          </Link>
        </Container>
        <Container className={`media-container ${SLIDER_SCREEN[carouselMove]}`}>
          {data &&
            data.map((singleCard) => (
              <Card
                id={singleCard.id}
                src={singleCard.poster_path}
                title={
                  mediaType === "tv"
                    ? singleCard.original_name
                    : singleCard.original_title
                }
                votes={singleCard.vote_average}
                key={singleCard.id}
                mediaType={mediaType}
              />
            ))}
        </Container>
      </Container>
    )
  );
};

export default CardListPreview;
