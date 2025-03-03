import express from 'express';
import { signupUser, loginUser } from '../controller/userController.js';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    console.log("Signup route hit"); // Debugging log
    next();
}, signupUser);

router.post('/login', loginUser);


export default router;
