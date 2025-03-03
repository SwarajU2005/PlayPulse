import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../model/token.js'

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        console.log('Received request body:', request.body); // Debugging line

        if (!request.body || !request.body.password) {
            console.error("Password is missing in the request body.");
            return response.status(400).json({ msg: 'Password is required' });
        }

        console.log("Received password:", request.body.password); // Debugging log

        const hashPassword = await bcrypt.hash(request.body.password, 10);
        const user = new User({
            email: request.body.email,
            name: request.body.name,  
            password: hashPassword
        });
        
        await user.save();
        console.log('User saved successfully:', user);

        return response.status(201).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error while saving user:', error);

        if (error.code === 11000) {
            return response.status(400).json({ msg: 'Username already exists' });
        }

        return response.status(500).json({ msg: 'Error while signup' });
    }
};



export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email }); // Use email instead of username
    if (!user) {
        return response.status(400).json({ msg: 'User does not exist' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN, { expiresIn: '7d' });

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                email: user.email
            });
        } else {
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while logging in' });
    }
};
