import express from 'express'
import { loginController, registerController, getAllUsersController, getProfileController } from '../controller/authController.js';
import { requireSignIn } from '../middleweres/authMiddlewere.js';
import multer from 'multer'
const router = express.Router()

router.post('/register', multer().single('profile'), registerController)

router.post('/login', loginController)

router.get('/all-users', requireSignIn, getAllUsersController)

router.get('/profile/:id', getProfileController)


export default router;