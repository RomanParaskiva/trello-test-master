import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";


const Card = ({card}, onDragStart) => {
    const [text, setText] = useState('')
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const {request} = useHttp()
    const [cardData, setCardData] = useState(card)

    const deleteCard = async (event) => {
        try {
            const data = request(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${card.id}/`, 'DELETE', null, {Authorization: `JWT ${token}`})
            const elem = event.target
            elem.parentNode.classList.add('hidden')
        } catch (e) {
            message(e)
        }
    }



    setTimeout( () => {
        let dropZone = document.querySelectorAll('.card-wrapper')
        if (dropZone) {
            [].forEach.call(dropZone, function (el) {
                el.addEventListener('dragenter', dragEnter, false);
                el.addEventListener('dragleave', dragLeave, false);
                el.addEventListener('dragover', dragOver, false);
                el.addEventListener('drop', dragDrop, false);
            })
        }
    },300)

    const dragEnter = (event) => {
        event.target.classList.add('over');
        event.target.classList.add('dragstart');
        if (event.target.offsetParent.classList.contains('card')){
            if(event.target.offsetParent.id != cardData.id){
                setCardData({...cardData, seq_num: parseInt(event.target.offsetParent.dataset.num) + 1 })
            }
        }
    }

    const dragLeave = (event) => {
        event.target.classList.remove('over');
        event.target.offsetParent.classList.remove('dragenter')
    }

    const dragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }

    let droppedIN = false;

    const dragDrop = (event) => {
        event.preventDefault();
        if (event.target.localName !== "ul") {
            event.dataTransfer.effectAllowed = 'none'
        } else {
            const elementID = event.dataTransfer.getData('text');
            const element = document.getElementById(elementID);
            event.target.appendChild(element);
            event.dataTransfer.clearData()
            const dropEl = document.querySelectorAll('.card-wrapper')
            if (dropEl) {
                [].forEach.call(dropEl, function (el) {
                    el.classList.remove('dragstart');
                    el.classList.remove('over');
                })
            }
            droppedIN = true;
        }
    }

    const dragStart = (event) => {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('text', event.target.getAttribute('id'));
        const dropEl = document.querySelectorAll('.card-wrapper')
        if(dropEl) {
            [].forEach.call(dropEl, function (el) {
                el.classList.add('dragstart');
            })
        }
    }

    const dragEnd = (event) => {
        if ( droppedIN === false ) {
            setCardData({...cardData, row: event.target.id})

            const data = request(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${cardData.id}/`, 'PATCH', {
                row: cardData.row,
                seq_num: cardData.seq_num,
                text: cardData.text
            }, {Authorization: `JWT ${token}`})
        }
        droppedIN = false;
    }


    return(
            <li
                className="card blue-grey darken-1"
                id={card.id}
                data-num={card.seq_num}
                draggable
                onDragStart={dragStart}
                onDragEnd={dragEnd}
            >
                <div className="card-content white-text">
                    <p>id: {card.id}</p>
                    <i className="card-close material-icons" onClick={deleteCard}>close</i>
                    <p>{card.text}</p>
                </div>
            </li>
    )
}

export  default Card