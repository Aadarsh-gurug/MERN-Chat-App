import { Box, Button, styled, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Container = styled(Box)({
    width: '100%',
    height: '100%',
})

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    background: 'lightgreen'
})

const Text = styled('form')({
    padding: 20,
    display: 'flex',
    marginTop: 'auto',
    background: 'grey',
})

const Messages = styled(Box)({
    height: '66.8vh',
    background: 'grey',
    padding: 10,
    overflowY: "auto",
    scrollBehavior: 'smooth'
})

const ReciveMessage = styled(Typography)({
    background: 'white',
    padding: '5px 10px',
    marginTop: 5,
    borderRadius: 5,
    maxWidth: '45%',
})

const SendMessage = styled(Typography)({
    background: 'lightgreen',
    padding: '5px 10px',
    marginTop: 5,
    borderRadius: 5,
    marginLeft: 'auto',
    maxWidth: '45%',
})

const ChatBox = ({ account }) => {

    const { user, conversation, activeUsers, socket } = useContext(AuthContext)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [incomingMessage, setIncomingMessage] = useState({})

    const scrollRef = useRef()


    useEffect(() => {
        socket?.current?.on('getMessage', data => {
            setIncomingMessage({
                ...data,
            })
        })
        // eslint-disable-next-line 
    }, [text, conversation, user])


    useEffect(() => {
        const fetchAllMessages = async () => {
            if (user && conversation) {
                const { data } = await axios.get(`/api/v1/chat/get/${conversation?._id}`)
                data && setMessages(data.messages)
            }
        }
        fetchAllMessages()
        // eslint-disable-next-line
    }, [user, conversation, text])

    const onSend = async (e) => {
        e.preventDefault()
        if (text) {
            await axios.post('/api/v1/chat/save', { message: text, senderId: account?._id, receiverId: user?._id, conversationId: conversation?._id })
            socket?.current?.emit('sendMessage', { message: text, senderId: account?._id, receiverId: user?._id, conversationId: conversation?._id })
            setText('')
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        // eslint-disable-next-line 
    }, [messages, conversation, text, user])

    useEffect(() => {
        incomingMessage && conversation.senderId && setMessages(prev => [...prev, incomingMessage])
    }, [incomingMessage, conversation, user])

    return (
        <Container>
            {
                user ? (
                    <Box>
                        <Header>
                            <img src={user?.profile ? `/api/v1/auth/profile/${user?.profile}` : 'https://www.aadarshguru.com/wp-content/uploads/2023/04/download.jpg'} style={{ width: 35, height: 35, borderRadius: '50%' }} alt="profile" />
                            <Typography style={{ margin: '10px 0 0 10px', fontWeight: 600, color: 'Highlight' }} >{user?.username}</Typography>
                            <Typography style={{ margin: '13px 5px 0px 10px', fontSize: 12, color: 'grey', fontWeight: 550 }} >{activeUsers?.find(person => person._id === user._id) ? 'Online' : 'Offline'}</Typography>
                        </Header>
                        <Messages ref={scrollRef} >
                            {
                                messages?.map(message => (
                                    message.senderId === account._id ? (
                                        <SendMessage key={message._id} >{message.message}</SendMessage>
                                    ) : (
                                        <ReciveMessage key={message._id} >{message.message}</ReciveMessage>
                                    )
                                ))
                            }
                        </Messages>
                        <Text onSubmit={(e) => onSend(e)} >
                            <TextField value={text} placeholder='Write the message or text here...' style={{ width: '100%', color: 'white', background: 'white' }} onChange={(e) => setText(e.target.value)} />
                            <Button type='submit' variant='contained' >Send</Button>
                        </Text>
                    </Box>
                ) : (
                    <Box style={{ height: '100%', width: '100%', background: 'white' }} ></Box>
                )
            }
        </Container>
    )
}

export default ChatBox



