import express from 'express';
import { sendMessage } from '../../controllers/messageController.js';

const router = express.Router();

// route for send user's message to the admin using nodemailer 
router.post('/sendMessage', sendMessage)

export default router ;