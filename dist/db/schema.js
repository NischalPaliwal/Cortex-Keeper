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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const contentTypes = ['image', 'video', 'article', 'audio'];
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: contentTypes
    },
    title: {
        type: String,
        required: true
    },
    tags: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const tagSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
const linkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const contentModel = mongoose_1.default.model("Content", contentSchema);
exports.contentModel = contentModel;
const userModel = mongoose_1.default.model("User", userSchema);
exports.userModel = userModel;
const tagModel = mongoose_1.default.model("Tag", tagSchema);
exports.tagModel = tagModel;
const linkModel = mongoose_1.default.model("Link", linkSchema);
exports.linkModel = linkModel;
userSchema.pre('save', function (next) {
    const hashedPassword = bcrypt_1.default.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
});
contentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.findById(this.userId);
        if (!user) {
            throw new Error('User does not exist');
        }
        next();
    });
});
