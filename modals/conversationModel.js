import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation;