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
exports.signin = exports.signup = void 0;
const zod_1 = require("zod");
const schema_1 = require("../db/schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string().min(6)
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = signUpSchema.parse(req.body);
        const userExists = yield schema_1.userModel.findOne({
            email: email,
            username: username
        });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }
        const user = yield schema_1.userModel.create({
            username: username,
            password: password,
            email: email
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        return res.status(201).json({ token, user });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = signInSchema.parse(req.body);
        const user = yield schema_1.userModel.findOne({
            username: username
        });
        if (!user || bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({
                message: 'Invalid credentials!'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        return res.status(200).json({ token, user });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Invalid input!'
        });
    }
});
exports.signin = signin;
