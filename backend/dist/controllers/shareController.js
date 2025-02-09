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
exports.sharedContent = exports.share = void 0;
const schema_1 = require("../db/schema");
const utils_1 = require("../utils");
const share = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (share) {
            const link = yield schema_1.linkModel.create({
                userId: req.user._id,
                hash: (0, utils_1.random)(10)
            });
            return res.json({
                message: "?share/" + link.hash
            });
        }
        else {
            yield schema_1.linkModel.deleteOne({
                userId: req.user._id
            });
            return res.json({
                message: "Link deleted"
            });
        }
    }
    catch (error) {
        console.log("Link already exists!");
    }
});
exports.share = share;
const sharedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.query.share;
    const link = yield schema_1.linkModel.findOne({
        hash: hash
    });
    if (!link) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
    const content = yield schema_1.contentModel.find({
        userId: link.userId
    });
    const user = yield schema_1.userModel.findOne({
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
});
exports.sharedContent = sharedContent;
