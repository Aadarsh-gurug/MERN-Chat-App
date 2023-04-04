import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = (props) => {

    const navigate = useNavigate()

    const auth = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [auth])

    return (
        <>{props.children}</>
    )
}

export default PrivateRoutes