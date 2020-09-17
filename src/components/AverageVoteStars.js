import React from 'react'
import Star from './Star'

const AverageVoteStars = ({ voteAverage }) => {
    const rating = Math.round(Math.floor(voteAverage > 0 ? voteAverage / 2 : 0));
    const getAverageVoteStars = (rating) => {
        let stars = [];
        if (rating < 1) {
            stars = [...Array(5)].map((star, i) => 'empty');
        } else {
            // Estrellas llenas
            stars = [...Array(rating)].map((star, i) => "filled");
            if (rating < 5) {
                // Estrellas medias si corresponde
                stars.push(voteAverage % 2 !== 0 ? 'half' : 'empty')
            }
            // Estrellas vacías si corresponde
            if (rating < 4) {
                [...Array(4 - rating)].map((star, i) => stars.push('empty'))
            }
        }
        return stars;
    }
    const stars = getAverageVoteStars(rating);
    return (
        (voteAverage || voteAverage === 0) &&
        <div className={ `rating-stars` }>
            {
                stars && stars.map((starType, i) => <Star key={ i } type={ starType } />) }
        </div>
    )
}

export default AverageVoteStars
