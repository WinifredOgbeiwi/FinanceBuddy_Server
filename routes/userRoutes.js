import express from 'express';
import { getUsers, registerUsers } from '../controllers/userController.js';


const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUsers);

export default router;