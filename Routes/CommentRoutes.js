import { Router } from "express";
import {
	createComment,
	deleteComment,
	getComments,
	updateComment,
} from "../Controllers/CommentController.js";

const router = Router();

router.post("/", createComment);
router.get("/:post_id", getComments); // Ensure this matches the controller function
router.put("/:comment_id", updateComment);
router.delete("/:comment_id", deleteComment);

export default router;
