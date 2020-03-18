import React, {useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";

const AddCardBlock = ({id}) => {
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const {request} = useHttp()
    const {token} = useAuth()
    const history = useHistory()
    const message = useMessage()
    const storageName = 'userData'
    const [newCard, setNewCard] = useState({
        row: 0, text: ''
    })

    const openInput = (event) => {
        event.target.nextSibling.classList.remove('hidden')
        event.target.classList.add('hidden')
    }

    const changeHandler = event => {
        setNewCard({row: id , text: event.target.value })
    };

    const addCard = async () => {
        const localData = JSON.parse(localStorage.getItem(storageName))
        if(localData && localData.token){
            try {
                const data = await request(reqUri + '/cards/', 'POST', {...newCard}, {
                    Authorization: `JWT ${token}`
                });
                if (data.id) {
                   const elem = document.querySelectorAll('.input_wrapper')
                    elem[id].classList.add('hidden')
                    elem[id].previousElementSibling.classList.remove('hidden')
                    setNewCard({row: 0, text: ''})
                }
            } catch (e) {
                message(e)
                console.log(e)
            }
        } else {
            history.push('/auth')
        }
    }

    const closeNewCard = (event) => {
        event.preventDefault()
        const elem = event.target.parentNode.parentNode.parentNode
        elem.classList.add('hidden')
        elem.previousElementSibling.classList.remove('hidden')
        setNewCard({row:0, text: ''})
    }

    return (
        <>
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
        </>
    )
}

export default AddCardBlock