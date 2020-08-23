import React from 'react'
import Star from './Star'

const AverageVoteStars = ({ voteAverage, showRating }) => {
    const rating = Math.round(voteAverage > 1 ? voteAverage / 2 : 0);
    return (
        showRating &&
        (<div className={"rating-stars"}>
            {(rating &&
                <>
                    {[...Array(rating)].map((star, i) => <Star key={i} type={'filled'} className={'average-star'} />)}
                    <Star type={voteAverage % 2 !== 0 ? 'half' : 'empty'} />
                    {[...Array(4 - rating)].map((star, i) => <Star key={rating + i} type={'empty'} className={'average-star'} />)}
                </>
            )
            }
        </div>)
    )
}

export default AverageVoteStars
