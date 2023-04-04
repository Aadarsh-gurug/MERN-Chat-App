import Message from '../modals/messageModel.js'


export const saveMessageController = async (req, res) => {
    try {
        const sentMessage = await Message(req.body).save()
        return res.status(200).json({ success: true, message: 'Message sent successfully', sentMessage })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while sending the message' })
    }
}

export const getMessagesController = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId })
        return res.status(200).json({ success: true, message: 'Messages fetched successfully', messages })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while fetching the messages' })
    }
}