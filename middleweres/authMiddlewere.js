import JWT from 'jsonwebtoken'
import userModel from '../modals/userModel.js';

//protected route token based

export const requireSignIn = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(200).json({ success: false, message: 'Please login to Continue' })
    }
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (decode) {
        req.user = decode
        next()
    } else {
        return res.status(200).json({ success: false, message: 'invalid access' })
    }
}
