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
        (<div className={`rating-stars`}>
            {[...Array(5)].map((star, i) => {
                const ratingValueOdd = i === 0 ? (i + 1) : ((i * 2) + 1);
                const ratingValueEven = i === 0 ? (i + 2) : ((i * 2) + 2);
                return (
                    <Container
                        key={`container_${ratingValueOdd}`}
                        className={`single-star-container ${theme}`}>
                        <input
                            type={"radio"}
                            name={`rating${title}`} // el title para que el nombre sea distinto en cada grupo de estrellas, pero iguales entre las estrellas de un mismo grupo.
                            value={ratingValueOdd}
                            onClick={() => setRating(ratingValueOdd)}
                            key={`input_${ratingValueOdd}`}
                            id={`input_${ratingValueOdd}`}
                        />
                        <label
                            key={`label_${ratingValueOdd}`}
                            className={`star-left ${ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}`}
                            onMouseEnter={() => setHover(ratingValueOdd)}
                            onMouseLeave={() => setHover(null)}
                            htmlFor={`input_${ratingValueOdd}`}>

                            <Star
                                key={`star_left_${ratingValueOdd}`}
                                type={ratingValueOdd <= (hover || rating) ? 'half-filled' : 'half-empty'}
                            />
                        </label>
                        <input
                            type={"radio"}
                            name={`rating${title}`}
                            value={ratingValueEven}
                            onClick={() => setRating(ratingValueEven)}
                            key={`input_${ratingValueEven}`}
                            id={`input_${ratingValueEven}`}
                        />
                        <label
                            key={`label_${ratingValueEven}`}
                            className={`star-right ${ratingValueEven <= (hover || rating) ? 'half-filled' : 'half-empty'}`}
                            onMouseEnter={() => setHover(ratingValueEven)}
                            onMouseLeave={() => setHover(null)}
                            htmlFor={`input_${ratingValueEven}`}>
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
