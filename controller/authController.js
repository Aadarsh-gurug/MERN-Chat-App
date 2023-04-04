import userModel from '../modals/userModel.js'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import Profile from '../modals/imageModel.js'


export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).json({ message: 'User Already Exist' })
        }
        if (req.file) {
            if (req.file.mimetype !== "image/png" & "image/jpeg") {
                return res.status(200).json({ message: 'Image Files Are Only Accepted.' })
            }
            if (req.file.size > 1000000) {
                return res.status(200).json({ message: ' Image File Size Should Be Less Than 1 MB' })
            }
            const profile = await Profile({ profile: req.file }).save()
            const hashedPassword = await bcrypt.hash(password, 10)
            await userModel.create({ username, email, password: hashedPassword, profile: `${profile._id}` })
            return res.status(201).json({ success: true, message: 'User registered successfully' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({ username, email, password: hashedPassword })
        return res.status(201).json({ success: true, message: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while registring user' })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: 'Email and Password must be provided' })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: 'invalid login details' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(200).json({ message: 'invalid login Details' })
        }
        const token = JWT.sign({ user }, process.env.JWT_SECRET)
        return res.status(201).json({ success: true, message: 'User Login successfully', token, user })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while login user' })
    }
}


export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password')
        return res.status(200).json({ success: true, message: 'User fetched successfully', users })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while calling get all users ' })
    }
}


export const getProfileController = async (req, res) => {
    try {
        const { profile } = await Profile.findById(req.params.id)
        if (profile) {
            res.set("Content-type", profile.mimetype)
            res.status(200).send(profile.buffer)
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error while calling profile api' })
    }
}
