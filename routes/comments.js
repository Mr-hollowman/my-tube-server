import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addComment, deleteComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoID", deleteComment);

export default router;
