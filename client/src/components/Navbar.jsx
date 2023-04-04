import React, { useContext } from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { toast } from 'react-hot-toast'

const Navbar = () => {

    const { auth, setAuth, setAccount } = useContext(AuthContext)

    const handleLogout = () => {
        setAuth('')
        setAccount({})
        localStorage.removeItem('token')
        localStorage.removeItem('account')
        toast.success('User Logout successfully')
    }

    return (
        <AppBar position='static' color='transparent' >
            <Toolbar>
                <Box>
                    <Link style={{ textDecoration: 'none' }} to={'/'} ><Typography variant='h6' style={{ color: 'green', fontWeight: 'bold' }} >Chat-App</Typography></Link>
                </Box>
                <Box style={{ marginLeft: 'auto' }} >
                    {
                        auth ?
                            <Box style={{ display: 'flex' }} >
                                <NavLink className='nav-link' to={'/login'} onClick={() => handleLogout()} >Logout</NavLink>
                            </Box>
                            :
                            <>
                                <NavLink className='nav-link' to={'/login'} >Login</NavLink>
                                <NavLink className='nav-link' to={'/register'}>SignUp</NavLink>
                            </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar