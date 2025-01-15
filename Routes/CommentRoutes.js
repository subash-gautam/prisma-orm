import { Router } from "express";
import {
	createComment,
	deleteComment,
	getComments,
	updateComment,
} from "../Controllers/CommentController.js";

const router = Router();

router.post("/", createComment);
router.get("/:id", getComments);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
