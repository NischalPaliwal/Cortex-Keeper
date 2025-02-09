import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../db/schema";
import { ObjectId } from "mongoose";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '');

        if (!token) {
            throw new Error();
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: ObjectId };

        const user = await userModel.findOne({
            _id: payload.id
        });

        if (!user) {
            throw new Error();
        }

        req.user = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized!"
        });
    }
}