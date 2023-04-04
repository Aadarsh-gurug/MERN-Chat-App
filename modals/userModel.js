import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password length must be 4 character long']
    },
    profile: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;