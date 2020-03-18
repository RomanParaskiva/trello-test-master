import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

const Card = ({card}) => {
    const [text, setText] = useState('')
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const {request} = useHttp()


    const deleteCard = async (event) => {
        try {
            const data = request(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${card.id}/`, 'DELETE', null, {Authorization: `JWT ${token}`})
            const elem = event.target.value
            elem.parentNode.classList.add('hidden')
        } catch (e) {
            message(e)
        }
    }

    return(
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <p>id: {card.id}</p>
                <i className="card-close material-icons" onClick={deleteCard}>close</i>
                <p>{card.text}</p>
            </div>
        </div>
    )
}

export  default Card