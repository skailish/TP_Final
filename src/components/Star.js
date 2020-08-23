import React from 'react'
import { Star as EmptyStar } from "@styled-icons/fa-regular/Star"
import { Star as FilledStar } from "@styled-icons/fa-solid/Star"
import { StarHalfAlt as FilledHalf } from "@styled-icons/fa-solid/StarHalfAlt"


const Star = ({ type }) => {


    return (
        <>
            {type === 'half' && (
                <FilledHalf className={'star'} />
            )}
            {type === 'filled' && (
                <FilledStar className={'star'} />
            )}
            {type === 'empty' && (
                <EmptyStar className={'star'} />
            )}
        </>)
}

export default Star