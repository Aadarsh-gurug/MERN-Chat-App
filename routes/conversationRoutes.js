import express from 'express'
import { requireSignIn } from '../middleweres/authMiddlewere.js';
import { conversationController } from '../controller/conversationController.js';
const router = express.Router()

router.post('/', requireSignIn, conversationController)

export default router;