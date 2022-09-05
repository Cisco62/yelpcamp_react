import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Find the existing user
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).send({ message: 'User does not exist' });
        }

        //Checking if password matches the registered password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        //Signing in the user
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '10h' });

        res.status(200).send({
            user: {
                email: existingUser.email,
                name: existingUser.name
            }, token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong.' });
    }
}
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstname, lastname } = req.body;

    try {
        //Check if user exists
        const existingUser = await User.findOne({ email })

        //Checking if user already exists
        if (existingUser) {
            return res.status(400).send({ message: 'User already exist' });
        }

        if (password !== confirmPassword) {
            return res.status(401).send({ message: "Password don't match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Creating the user account
        const user = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });

        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: '10h' });

        res.status(200).send({
            user: {
                email: user.email,
                name: user.name
            }, token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong.' });
    }
}

export const googleAuth = async (req, res) => {
    const body = {
        ...req.body
    }

    const existingUser = await User.findOne({ email: body.email })

    if (!existingUser) {
        // we want signup
        const hashedPassword = await bcrypt.hash(body.sub, 12);
        const googleUser = await User.create({ email: body.email, password: hashedPassword, name: body.name });

        const token = jwt.sign({ email: googleUser.email, id: googleUser._id }, 'test', { expiresIn: '10h' });

        return res.status(200).send({
            user: {
                email: googleUser.email,
                name: googleUser.name
            }, token
        });

    }

    const isPasswordCorrect = await bcrypt.compare(body.sub, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(401).send({ message: 'Invalid username or password' });

    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '10h' });

    return res.status(200).send({
        user: {
            email: existingUser.email,
            name: existingUser.name
        }, token
    });

}