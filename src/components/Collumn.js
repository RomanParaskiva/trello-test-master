import React, {useState} from 'react'
import Card from "./Card";

const Collumn = ({id, cards}) => {
    if(cards.length > 0){
        console.log(cards.map(card => card.row == id ? <Card card={card} /> : '' ))
        return (
            <div className="card-wrapper">
                {cards.map(card => card.row == id ? <Card key={card.id} card={card} /> : '' )}
            </div>
        )
    } else {
        return (
            <p>Еще грузится</p>
        )
    }

}

export default Collumn