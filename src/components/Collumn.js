import React, {useState} from 'react'
import Card from "./Card";




const Collumn = ({id, cards}) => {
        return (
            <ul className="card-wrapper" id={id} >
                {cards && cards.map(card => card.row == id ? <Card key={card.id} card={card} /> : null )}
            </ul>
        )
}

export default Collumn