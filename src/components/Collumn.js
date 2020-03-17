import React, {useEffect, useState} from 'react'
import Card from "./Card";
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";

const Collumn = ({ id , ...card}) => {
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const {request,loading} = useHttp()
    const {token} = useAuth()
    console.log(token)
    const [newCard, setNewCard] = useState({
        row: 0, text: ''
    })
    const [cards, setCards] = useState([card])
    const readyCard = cards.map(card => <Card {...card}/>)

    const openInput = (event) => {
        console.log(event.target.nextSibling)
        event.target.nextSibling.classList.remove('hidden')
        event.target.classList.add('hidden')
    }

    const changeHandler = event => {
        setNewCard({row: id , text: event.target.value })
    };

    const addCard = async () => {
        try {
            const data = await request(reqUri + '/cards/', 'POST', {...newCard}, {
                Authorization: `JWT ${token}`
            });
        } catch (e) { }
    }

    const closeNewCard = (event) => {
        event.preventDefault()
        const elem = event.target.parentNode.parentNode.parentNode
        elem.classList.add('hidden')
        elem.previousElementSibling.classList.remove('hidden')
        setNewCard({row:0, text: ''})
    }


    return (
        <div className="card-wrapper" id={id}>
                <button className="addBlock" onClick={openInput}><i className="material-icons">add</i>
                Добавить карточку
                </button>
                <div className="input_wrapper hidden">
                    <textarea className="card_input materialize-textarea" onChange={changeHandler} placeholder="Введите заголовок для этой карточки" value={newCard.text}/>
                    <div className="btn_wrapper">
                        <button className='addCard' onClick={addCard}>Добавить карточку</button>
                        <a onClick={closeNewCard}><i className="material-icons">close</i></a>
                    </div>
                </div>
            {readyCard}
        </div>
    )
}

export default Collumn