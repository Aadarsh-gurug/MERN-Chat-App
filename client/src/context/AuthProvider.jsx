import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useRef } from 'react'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState('')
    const [account, setAccount] = useState({})
    const [user, setUser] = useState()
    const [conversation, setConversation] = useState({})
    const [activeUsers, setActiveUsers] = useState([])

    const socket = useRef()

    useEffect(() => {
        socket.current = io()
    }, [])

    axios.defaults.headers.common["Authorization"] = auth;

    useEffect(() => {
        if (!auth || !account) {
            setAuth(JSON.parse(localStorage.getItem('token')))
            setAccount(JSON.parse(localStorage.getItem('account')))
        }
        // eslint-disable-next-line
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth, account, setAccount, user, setUser, conversation, setConversation, socket, activeUsers, setActiveUsers }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider