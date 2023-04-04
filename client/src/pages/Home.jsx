import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Box, styled } from '@mui/material'
import Messages from '../components/Messages'
import ChatBox from '../components/ChatBox'



const Component = styled(Box)({
    margin: '20px auto',
    width: '95vw',
    height: '87vh',
    display: 'flex'
})

const Home = () => {

    const { account } = useContext(AuthContext)

    return (
        <>
            <Component sx={{ boxShadow: 5, backgroundColor: '' }} >
                <Box style={{ borderRight: '1px solid lightgrey' }} width={'30%'} >
                    <Messages account={account} />
                </Box>
                <Box width={'70%'} >
                    <ChatBox account={account} />
                </Box>
            </Component>
        </>
    )
}

export default Home