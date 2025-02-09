"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @ts-ignore
router.post('/signup', authMiddleware_1.authMiddleware, authController_1.signup);
// @ts-ignore
router.post('/signin', authMiddleware_1.authMiddleware, authController_1.signin);
exports.default = router;
