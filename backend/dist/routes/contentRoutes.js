"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_1 = require("../controllers/contentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
//@ts-ignore
router.post("/create", authMiddleware_1.authMiddleware, contentController_1.createContent);
//@ts-ignore
router.get("/get", authMiddleware_1.authMiddleware, contentController_1.getContent);
//@ts-ignore
router.delete("/delete", authMiddleware_1.authMiddleware, contentController_1.deleteContent);
exports.default = router;
