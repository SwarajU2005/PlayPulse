import express from 'express';
import { signupAowner, loginAowner } from '../controller/Aownercontroller.js';

const ownerrouter = express.Router();

ownerrouter.post('/ownersignup', (req, res, next) => {
    console.log("Signup route hit"); // Debugging log
    next();
}, signupAowner);

ownerrouter.post('/ownerlogin', loginAowner);


export default ownerrouter;
