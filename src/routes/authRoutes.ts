import express from "express";
import { signup, signin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @ts-ignore
router.post('/signup', authMiddleware, signup);
// @ts-ignore
router.post('/signin', authMiddleware, signin);

export default router;