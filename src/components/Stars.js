import React, { useContext, useState } from 'react'
import ThemeContext from "../contexts/ThemeContext";
import Star from "./Star"
import Container from "./primitive/Container"

const Stars = ({ title, showStars }) => {
    const { theme } = useContext(ThemeContext);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        showStars &&
        (<div className={`rating-stars ${theme}`}>
            {[...Array(5)].map((star, i) => {
                const ratingValueOdd = i + 1;
                const ratingValueEven = i + 2;
                return (
                    <Container
                        key={`container_${ratingValueOdd}`}
                        className={'single-star-container'}>
                        <label
                            key={`label_${ratingValueOdd}`}
                            className={'star-left'}
                            onMouseEnter={() => setHover(ratingValueOdd)}
                            onMouseLeave={() => setHover(null)}>
                            <input
                                type={"radio"}
                                name={`rating${title}`}
                                value={ratingValueOdd}
                                onClick={() => setRating(ratingValueOdd)}
                                key={`input_${ratingValueOdd}`}
                            />
                            <Star
                                className={'star-right'}
                                key={`star_left_${ratingValueOdd}`}
                                type={ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}
                            />
                        </label>
                        <label
                            key={`label_${ratingValueEven}`}
                            className={'star-right'}
                            onMouseEnter={() => setHover(ratingValueEven)}
                            onMouseLeave={() => setHover(null)}>
                            <input
                                type={"radio"}
                                name={`rating${title}`}
                                value={ratingValueEven}
                                onClick={() => setRating(ratingValueEven)}
                                key={`input_${ratingValueEven}`}
                            />
                            <Star
                                className={'star-right'}
                                key={`star_right_${ratingValueEven}`}
                                type={ratingValueEven <= (hover || rating) ? 'half-filled' : 'half-empty'}
                            />
                        </label>
                    </Container>

                )
            })}
        </div>)
    );
};

export default Stars
