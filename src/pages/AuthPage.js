import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const AuthPage = () =>{
    const reqUri = 'https://trello.backend.tests.nekidaem.ru/api/v1'
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError} = useHttp();
    const[form, setForm]  = useState({
        username: '', password: ''
    });
    const history =  useHistory()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const registerHandler = async () => {
        try {
            const data = await request(reqUri + '/users/create/', 'POST', {...form});
            if(data.username === form.username){
                message('Пользователь создан');
                auth.login(data.token, data.username)
                history.push('/')
            }
        } catch (e) {
            message(e)
        }
    };
    const loginHandler = async () => {
        try {
            const data = await request(reqUri + '/users/login/', 'POST', {...form}, {Authorization: 'Bearer'});
            auth.login(data.token, form.username)
            history.push('/')
        } catch (e) {
            message(e)
        }
    }
    return  (
        <div className="auth_container black-text">
            <div className="card">
                <div className="card-content">
                    <h2 className="card-title center-align">Sign up / Sign in</h2>
                    <div className="mt">
                        <div className="input-field">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                className="validate"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className="mt">
                        <div className="input-field">
                            <input
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                className="validate black-text"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>



                <div className="card-action">
                    <button
                        className="btn blue waves-orange darken-2 white-text mr"
                        onClick={registerHandler}
                        disabled={loading}
                    >Зарегистрироваться
                    </button>
                    <button
                        className="btn  amber lighten-2 black-text mr"
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;