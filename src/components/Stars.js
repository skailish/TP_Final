import React, { useContext, useState } from 'react'
import ThemeContext from "../contexts/ThemeContext";
import Star from "./Star"

const Stars = ({ title }) => {
    const { theme } = useContext(ThemeContext);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    return (

        <div className={`rating-stars ${theme}`}>
            {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1;
                const isHalf = ratingValue === (rating + 1);
                return (
                    <label key={`label_${ratingValue}`}>
                        <input
                            type={"radio"}
                            name={`rating${title}`}
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            key={`input_${ratingValue}`}
                        />
                        {ratingValue % 2 === 0 &&
                            <Star
                                key={`star_${ratingValue}`}
                                type={ratingValue <= (hover || rating) ? 'filled' : (isHalf ? 'half' : 'empty')}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        }
                    </label>
                )
            })}
        </div>
    );
};

export default Stars
