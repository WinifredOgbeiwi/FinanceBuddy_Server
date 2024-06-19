import express from 'express';
import { editUsers, getUsers, registerUsers } from '../controllers/userController.js';


const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUsers);
router.put("/edit/:id", editUsers);

export default router;