import Conversation from '../modals/conversationModel.js'


export const conversationController = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        const conversation = await Conversation.findOne({ senderId: senderId, receiverId: receiverId })
        if (conversation) {
            return res.status(200).json(conversation)
        }
        const checked = await Conversation.findOne({ senderId: receiverId, receiverId: senderId })
        if (checked) {
            return res.status(200).json(checked)
        }
        const newConversation = await Conversation(req.body).save()
        return res.status(200).json(newConversation)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while making the message' })
    }
}