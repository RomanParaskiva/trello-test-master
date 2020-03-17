import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [username, setUserName] = useState(null)

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

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.username)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, username, ready }
}