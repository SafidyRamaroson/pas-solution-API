import express from 'express';
import { createAdmin } from './../../controllers/adminController.js';

const router = express.Router();

//route for create user
router.post('/',createAdmin);


export default router ;