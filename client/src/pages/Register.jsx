import React, { useState } from 'react'
import { Box, Typography, TextField, useMediaQuery, styled, Button, InputBase } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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

const Register = () => {

    const isNotMobile = useMediaQuery("(min-width:1000px)")
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profile, setProfile] = useState('')
    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            const data = new FormData()
            data.append('username', username)
            data.append('email', email)
            data.append('password', password)
            if (profile) {
                data.append('profile', profile)
            }
            const response = await axios.post('/api/v1/auth/register', data)
            if (data) {
                if (response.status === 201) {
                    toast.success(response.data.message)
                    navigate('/login')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Required feilds can not be empty.')
        }
    }

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5, backgroundColor: '' }} >
            <Typography variant='h4' textAlign={'center'} >Sign-Up</Typography>
            <Component>
                <TextField type='text' label='Full Name' required margin='normal' variant='standard' name='username' onChange={(e) => setUsername(e.target.value)} />
                <TextField type='email' label='Email' required margin='normal' variant='standard' name='email' onChange={(e) => setEmail(e.target.value)} />
                <TextField type='password' label='Password' required margin='normal' variant='standard' name='password' onChange={(e) => setPassword(e.target.value)} />
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', borderRadius: '10px', color: 'GrayText', marginBottom: 20 }} >
                    <Typography style={{ fontWeight: 550, fontSize: 18, marginRight: 10 }} >{profile ? profile?.name : 'Choose Profile Pictire'}</Typography>
                    <label htmlFor="profile"><AddPhotoAlternateIcon style={{ cursor: 'pointer', fontSize: 28 }} /></label>
                    <InputBase type='file' id='profile' style={{ display: 'none' }} onChange={(e) => setProfile(e.target.files[0])} />
                </Box>
                <Button onClick={() => onSubmit()} variant='contained' >Sign-Up</Button>
                <Typography textAlign={'center'} >Already have an account ? <Link to='/login' >Login</Link></Typography>
            </Component>
        </Box>
    )
}

export default Register