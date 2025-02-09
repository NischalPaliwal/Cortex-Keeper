import express from "express";
import { signup, signin } from "../controllers/authController";

const router = express.Router();

// @ts-ignore
router.post('/signup', signup);
// @ts-ignore
router.post('/signin', signin);

export default router;