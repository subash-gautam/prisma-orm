import { Router } from "express";
import {
	createPost,
	deletePost,
	getPostsByUser,
	getPostById,
	getPosts,
	updatePost,
} from "../Controllers/PostController.js";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/user/:user_id", getPostsByUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
