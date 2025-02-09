import express, { RequestHandler } from "express";
import { share, sharedContent } from "../controllers/shareController";

const router = express.Router();

router.post('/share', share as RequestHandler);
// @ts-ignore
router.get('/shared-content', sharedContent as RequestHandler);

export default router;