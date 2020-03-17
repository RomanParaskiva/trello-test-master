import React from 'react'

const Card = ({...card}) => {

    return(
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <p>{card.text}</p>
            </div>
        </div>
    )
}

export  default Card