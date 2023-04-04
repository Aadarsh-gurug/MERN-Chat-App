import express from 'express'
import { getMessagesController, saveMessageController } from '../controller/messageController.js';
import { requireSignIn } from '../middleweres/authMiddlewere.js';
const router = express.Router()

router.post('/save', requireSignIn, saveMessageController)
router.get('/get/:conversationId', requireSignIn, getMessagesController)

export default router;