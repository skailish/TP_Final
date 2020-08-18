import React, { useContext } from 'react'
import ThemeContext from "../contexts/ThemeContext"

const Star = ({ type, voteAverage = null }) => {

    const { theme } = useContext(ThemeContext)
    const backgroundStar = theme === 'dark' ? "#144d53" : "#b23535";
    const background = theme === 'dark' ? "#1b262c" : "#a8a9ac";

    return (
        <>
            {(type === 'filled') && (

                <svg className={'star'}>
                    <polygon points="100,10 40,198 190,78 10,78 160,198"
                        style={{ fill: backgroundStar, fillRule: 'nonzero' }} />
                </svg>
            )}

            {(type === 'empty') && (
                <svg className={'star'}>

                    <polygon points="100,10 40,198 190,78 10,78 160,198"
                        style={{ fill: background, fillRule: 'nonzero' }} />
                </svg>
            )}

            {(type === 'average') && (<svg className={'star'}>
                <defs>
                    <linearGradient id="myGradient">
                        <stop offset={`${voteAverage ? (voteAverage * 10) : 10}%`} stopColor={`${backgroundStar}`} />
                        <stop offset={`${voteAverage ? (100 - (voteAverage * 10)) : 100}%`} stopColor={`${background}`} />
                    </linearGradient>
                </defs>
                <polygon points="100,10 40,198 190,78 10,78 160,198"
                    style={{ fill: "url('#myGradient')", fillRule: 'nonzero' }} />

            </svg>)
            }
        </>
    )

}

export default Star
