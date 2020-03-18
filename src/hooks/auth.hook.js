import {useState, useCallback, useEffect} from 'react'
import {useHttp} from "./http.hook";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [username, setUserName] = useState(null)
    const {request} = useHttp()

    const login = useCallback((jwtToken, name) => {
        setToken(jwtToken)
        setUserName(name)

        localStorage.setItem(storageName, JSON.stringify({
            username: name, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserName(null)

        localStorage.removeItem(storageName)
    }, [])

    const refresh = useCallback(async () =>{
        const localData = JSON.parse(localStorage.getItem(storageName))
        try {
            const data = await request('https://trello.backend.tests.nekidaem.ru/api/v1/users/refresh_token/', 'POST', { token: localData.token}, { Authorization: `Bearer ${localData.token}`})
            localStorage.setItem(storageName, JSON.stringify({
                username: localData.username, token: data.token
            }))
            setToken(data.token)
        } catch (e) {
            return e
        }
    },[request])

    useEffect( () => {
        refresh(token, username)
    },[refresh, token, username])


    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.username)
        }
        setReady(true)
    }, [login])

    return { login, logout, refresh, token, username, ready }
}