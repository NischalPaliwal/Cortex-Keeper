import { Request, Response } from "express";
import { contentModel, linkModel, userModel } from "../db/schema";
import { random } from "../utils";

export const share = async (req: Request, res: Response) => {
    try {
        const { share } = req.body;
        if (share) {
            const link = await linkModel.create({
                userId: req.user._id,
                hash: random(10)
            });
            return res.json({
                message: "?share/" + link.hash
            });
        } else {
            await linkModel.deleteOne({
                userId: req.user._id
            });
            return res.json({
                message: "Link deleted"
            });
        }
    } catch (error) {
        console.log("Link already exists!");
    }
}

export const sharedContent = async (req: Request, res: Response) => {
    const hash = req.query.share;
    const link = await linkModel.findOne({
        hash: hash
    });

    if (!link) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }

    const content = await contentModel.find({
        userId: link.userId
    });

    const user = await userModel.findOne({
        _id: link.userId,
    });

    if (!user) {
        return res.status(400).json({
            message: 'User not found!'
        });
    }

    return res.json({
        username: user.username,
        content: content
    });
}