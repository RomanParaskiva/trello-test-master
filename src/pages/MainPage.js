import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {Container} from "../components/Container";
import {CardContext} from "../context/CardContext";

const MainPage = () => {
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const [cards, setCards] = useState([])


    const fetchCards = useCallback(async () => {
        try {
                const data = await request(reqUri + '/cards/', 'GET', null, {
                    Authorization: `JWT ${token}`
                })
            if(data) {
                setCards(data)
            }

        } catch (e) {
           console.log(e)
        }
    },[request, message, token]);

    useEffect( () => {
        fetchCards()
    },[fetchCards]);

    if (cards.length > 0) {
        return(
                <Container cards={cards}/>
                )
    } else {
        return (
            <div className="df">
                <Container />
            </div>
        )
    }

}

export default MainPage