import React, { useContext, useState } from 'react'
import { Box, Typography, TextField, useMediaQuery, styled, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { AuthContext } from '../context/AuthProvider'

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
        padding: 10,
        marginTop: 10
    },
    '& > p': {
        marginTop: 10,
        fontSize: 14,
        color: 'green',
        '& > a': {
            textDecoration: 'none',
            fontSize: 14,
            color: 'red',
            fontWeight: 550
        }
    }
})
const Login = () => {

    const isNotMobile = useMediaQuery("(min-width:1000px)")
    const [data, setData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const { setAuth, setAccount } = useContext(AuthContext)

    const onSubmit = async () => {
        try {
            const response = await axios.post('/api/v1/auth/login', data)
            if (response.status === 201) {
                toast.success(response.data.message)
                setAccount(response.data.user);
                localStorage.setItem('account', JSON.stringify(response.data.user))
                setAuth(response.data.token)
                localStorage.setItem('token', JSON.stringify(response.data.token))
                navigate('/')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.success('Something went wrong')
        }
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5, backgroundColor: '' }} >
            <Typography variant='h4' textAlign={'center'} >Login</Typography>
            <Component>
                <TextField type='email' label='Email' required margin='normal' variant='standard' name='email' onChange={(e) => onValueChange(e)} />
                <TextField type='password' label='Password' required margin='normal' variant='standard' name='password' onChange={(e) => onValueChange(e)} />
                <Button onClick={() => onSubmit()} variant='contained' >Login</Button>
                <Typography textAlign={'center'} >Don't have an account ? <Link to='/register' >Sign-Up</Link></Typography>
            </Component>
        </Box>
    )
}

export default Login