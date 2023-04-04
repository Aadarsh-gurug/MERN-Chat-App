import { Box, styled, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthProvider'


const Container = styled(Box)({
    width: '100%',
    height: '100%',
    background: 'lightgrey'
})

const Header = styled(Box)({
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'lightblue'
})

const Component = styled(Box)({
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    margin: 5,
    background: 'white',
    cursor: 'pointer',
})

const Messages = ({ account }) => {

    const [users, setUsers] = useState([])

    const { setUser, setConversation, socket, setActiveUsers, conversation, user } = useContext(AuthContext)

    useEffect(() => {
        const getAllUsers = async () => {
            if (account) {
                const { data } = await axios.get('/api/v1/auth/all-users')
                setUsers(data.users)
            }
        }
        getAllUsers()
    }, [account])


    const onMessageClick = async (user) => {
        setUser(user)
        const response = await axios.post(`/api/v1/conversation/`, { senderId: account?._id, receiverId: user?._id })
        setConversation(response?.data)
    }

    useEffect(() => {
        socket?.current?.emit('addUsers', account)
        socket?.current?.on('getUsers', users => {
            setActiveUsers(users)
        })
        // eslint-disable-next-line
    }, [user, conversation])

    return (
        <Container>
            <Header>
                <img src={account?.profile ? `/api/v1/auth/profile/${account?.profile}` : 'https://www.aadarshguru.com/wp-content/uploads/2023/04/download.jpg'} style={{ width: 35, height: 35, borderRadius: '50%' }} alt="profile" />
                <Typography style={{ margin: '10px 0 0 10px', fontWeight: 600, color: 'Highlight' }} >Welcome {account?.username}</Typography>
            </Header>
            <Box style={{ overflowY: 'auto' }} >
                {
                    users?.map(user => {
                        return account?._id !== user?._id && <Component onClick={() => onMessageClick(user)} key={user._id} >
                            <img src={user?.profile ? `/api/v1/auth/profile/${user?.profile}` : 'https://www.aadarshguru.com/wp-content/uploads/2023/04/download.jpg'} style={{ width: 50, height: 50, borderRadius: '50%' }} alt="profile" />
                            <Typography style={{ margin: '10px 0 0 10px', fontWeight: 600, color: 'black' }} >{user?.username}</Typography>
                        </Component>
                    })
                }
            </Box>
        </Container>
    )
}

export default Messages