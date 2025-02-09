"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContent = exports.createContent = void 0;
const zod_1 = require("zod");
const schema_1 = require("../db/schema");
const contentSchema = zod_1.z.object({
    link: zod_1.z.string().url(),
    type: zod_1.z.enum(['image', 'video', 'article', 'audio']),
    title: zod_1.z.string().min(3),
    tags: zod_1.z.array(zod_1.z.string())
});
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title, tags } = contentSchema.parse(req.body);
        const content = yield schema_1.contentModel.create({
            link: link,
            type: type,
            title: title,
            tags: tags
        });
        return res.status(201).json(content);
    }
    catch (error) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
});
exports.createContent = createContent;
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield schema_1.contentModel.find({
            userId: req.user._id
        }).populate({
            path: "userId",
            select: "username"
        });
        return res.status(200).json(content);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error!'
        });
    }
});
exports.getContent = getContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.contentModel.deleteOne({
            _id: req.params.id,
            userId: req.user._id
        });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error!'
        });
    }
});
exports.deleteContent = deleteContent;
