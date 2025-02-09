import { Request, Response } from "express";
import { z } from "zod";
import { userModel } from "../db/schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUpSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6)
});

const signInSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6)
});

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = signUpSchema.parse(req.body);
    
        const userExists = await userModel.findOne({
            email: email,
            username: username
        });
    
        if (userExists) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const user = await userModel.create({
            username: username,
            password: password,
            email: email
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET as string);
    
        return res.status(201).json({ token, user });
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = signInSchema.parse(req.body);

        const user = await userModel.findOne({
            username: username
        });

        if (!user || bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                message: 'Invalid credentials!'
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET as string);

        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
}