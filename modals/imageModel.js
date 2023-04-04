import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    profile: {
        type: {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            buffer: Buffer,
            size: Number
        }
    }
})

const Profile = mongoose.model('profile', profileSchema)

export default Profile;