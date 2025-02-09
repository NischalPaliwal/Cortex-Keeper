import { Request, Response } from "express";
import { z } from "zod";
import { contentModel } from "../db/schema";

const tagSchema = z.object({
    title: z.string(),
});

const contentSchema = z.object({
    link: z.string().url(),
    type: z.enum(['image', 'video', 'article', 'audio']),
    title: z.string().min(3),
    tags: z.array(tagSchema)
})

export const createContent = async (req: Request, res: Response) => {
    try {
        const { link, type, title, tags } = contentSchema.parse(req.body);
        const content = await contentModel.create({
            link: link,
            type: type,
            title: title,
            tags: tags,
            userId: req.user._id
        });

        return res.status(201).json(content);
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
}

export const getContent = async (req: Request, res: Response) => {
    try {
        const content = await contentModel.find({
            userId: req.user._id
        }).populate({
            path: "userId",
            select: "username"
        });

        return res.status(200).json(content);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error!'
        });
    }
}

export const deleteContent = async (req: Request, res: Response) => {
    try {
        await contentModel.deleteOne({
            _id: req.params.id,
            userId: req.user._id
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error!'
        });
    }
}