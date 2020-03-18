import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {Container} from "../components/Container";
import {Loader} from "../components/Loader";

const MainPage = () => {
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const history = useHistory()
    const storageName = 'userData'
    const [cards, setCards] = useState([])


    const fetchCards = useCallback(async () => {
        try {
                const data = await request(reqUri + '/cards/', 'GET', null, {
                Authorization: `JWT ${token}`
            });
                    setCards(data)
        } catch (e) {
            message(e)
        }
    },[request, message, token]);

    useEffect( () => {
        fetchCards()
    },[fetchCards]);


    console.log(cards)

    if (cards.length > 0) {
        return(

                <Container cards={cards}/>
            )
    } else {
        return (
            <Loader/>
        )
    }

}

export default MainPage