import React from 'react'
import Star from './Star'

const AverageVoteStars = ({ voteAverage }) => {
    const rating = Math.round(Math.floor(voteAverage > 1 ? voteAverage / 2 : 0));
    
    return (
        voteAverage &&
        (<div className={ `rating-stars` }>
            {((rating > 0) &&
                <>
                    {[...Array(rating)].map((star, i) => <Star key={i} type={'filled'} className={'average-star'} />)}
                    <Star type={voteAverage % 2 !== 0 ? 'half' : 'empty'} className={'average-star'} />

                    {rating < 4 && [...Array(4 - rating)].map((star, i) => <Star key={rating + i} type={'empty'} className={'average-star'} />)}
                </>
            )
            }
            {((rating === 0) &&
                <>
                    {[...Array(5)].map((star, i) => <Star key={i} type={'empty'} className={'average-star'} />)}
                </>
            )
            }

        </div>)
    )
}

export default AverageVoteStars
