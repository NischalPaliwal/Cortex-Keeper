"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shareController_1 = require("../controllers/shareController");
const router = express_1.default.Router();
router.post('/share', shareController_1.share);
// @ts-ignore
router.get('/shared-content', shareController_1.sharedContent);
exports.default = router;
