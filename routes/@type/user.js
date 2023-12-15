import express from 'express';
import { createUser, getUsers,getUser , login} from './../../controllers/userController.js';

const router = express.Router();

//route for create user
router.post('/createUser', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/login', login);

export default router ;
