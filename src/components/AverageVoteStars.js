import React from 'react'
import Star from './Star'

const AverageVoteStars = ({ voteAverage }) => {
    const rating = voteAverage > 1 ? Math.round(voteAverage / 2) : 0;
    console.log(rating);
    return (
        <div>
            <div className={"rating"}>
                {[Array(rating)].map((star, i) => <Star className={'star'} key={i} type={'filled'} />)}
                <Star type={'half'} voteAverage={voteAverage / 2} />
                {[Array(rating - 4)].map((star, i) => <Star className={'star'} key={rating + i} type={'empty'} />)}
            </div>
        </div>
    )
}

export default AverageVoteStars
