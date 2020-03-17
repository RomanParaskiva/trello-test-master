import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import Collumn from "../components/Collumn";
import {useAuth} from "../hooks/auth.hook";

const MainPage = () => {
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const message = useMessage();
    const {token} = useAuth();
    const { loading, error, request, clearError} = useHttp();
    const [cards, setCards] = useState([])

    const fetchCards = useCallback(async () => {
        try {
            const data = await request(reqUri + '/cards/', 'GET', null, {
                Authorization: `JWT ${token}`
            });
            setCards(data)
            console.log(data)
        } catch (e) {
            message(e.message)
        }
    },[request, message, token]);

    useEffect( () => {
        fetchCards()
    }, [fetchCards]);

    return(
            <div className="container df">
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "orange"}}>
                        <p>on-hold</p>
                    </div>
                    <Collumn id={1} {...cards}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "blue"}}>
                        <p>in-Progress</p>
                    </div>
                    <Collumn id={2} {...cards}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "yellow"}}>
                        <p>needs-review</p>
                    </div>
                    <Collumn id={3} {...cards}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "green"}}>
                        <p>approved</p>
                    </div>
                    <Collumn id={4} {...cards}/>
                </div>
            </div>
    )
}

export default MainPage