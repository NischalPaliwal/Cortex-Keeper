import express from "express";
import { createContent, getContent, deleteContent } from "../controllers/contentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

//@ts-ignore
router.post("/create", authMiddleware, createContent);
//@ts-ignore
router.get("/get", authMiddleware, getContent);
//@ts-ignore
router.delete("/delete/:id", authMiddleware, deleteContent);

export default router;