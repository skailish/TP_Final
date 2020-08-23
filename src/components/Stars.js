import React, { useContext, useState } from 'react'
import ThemeContext from "../contexts/ThemeContext";
import Star from "./Star"
import Container from "./primitive/Container"

const Stars = ({ contentName, showStars }) => {
    const { theme } = useContext(ThemeContext);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        showStars &&
        (<div className={`rating-stars`}>
            {[...Array(5)].map((star, i) => {
                const ratingValueOdd = i + 1;
                const ratingValueEven = i + 2;
                return (
                    <Container
                        key={`container_${ratingValueOdd}`}
                        className={`single-star-container ${theme}`}>
                        <label
                            key={`label_${ratingValueOdd}`}
                            className={`star-left ${ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}`}
                            onMouseEnter={() => setHover(ratingValueOdd)}
                            onMouseLeave={() => setHover(null)}>

                            <input
                                type={"radio"}
                                name={`rating${contentName}`}
                                value={ratingValueOdd}
                                onClick={() => setRating(ratingValueOdd)}
                                key={`input_${ratingValueOdd}`}
                            />
                            <Star

                                key={`star_left_${ratingValueOdd}`}
                                type={ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}
                            />
                        </label>
                        <label
                            key={`label_${ratingValueEven}`}
                            className={`star-right ${ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}`}
                            onMouseEnter={() => setHover(ratingValueEven)}
                            onMouseLeave={() => setHover(null)}>
                            <input
                                type={"radio"}
                                name={`rating${contentName}`}
                                value={ratingValueEven}
                                onClick={() => setRating(ratingValueEven)}
                                key={`input_${ratingValueEven}`}
                            />
                            <Star

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
