import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/primitive/Container";
import Card from "./Card";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import Heading from "./primitive/Heading";
import Span from "./primitive/Span";
//import Link from "./primitive/Link";
import Button from "./primitive/Button";
import ThemeContext from "../contexts/ThemeContext";

const CardListPreview = ({ mediaType, data, sectionTitle, category }) => {
  // const history = useHistory();
  const { theme } = useContext(ThemeContext);

  // const handleExploreAllClick = (type, category) => {
  //   history.push(`/${type}/category/${category}`);
  // };

  return (
    data && (
      <Container className={`cardlistpreview-container ${theme} `}>
        <Container className="cardlistpreview-title">
          <Heading className={`cardlistpreview-heading ${theme} `} level={1}>
            {sectionTitle}
          </Heading>
          <Span>
            <Link to={`${mediaType}/${category}`}>Explore All</Link>
          </Span>
        </Container>
        {/* <Button className={`chevron-container chevron-left ${theme} `}>
          <ChevronLeft className={`chevron-icon ${theme} `} />
        </Button>
        <Button className={`chevron-container chevron-right ${theme} `}>
          <ChevronRight className={`chevron-icon ${theme} `} />
        </Button> */}
        <Container className="media-container">
          {data &&
            data.map((singleCard) => (
              <Card
                id={singleCard.id}
                src={singleCard.poster_path}
                title={
                  mediaType === "tv"
                    ? singleCard.original_name
                    : singleCard.title
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
