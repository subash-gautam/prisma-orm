import { Router } from "express";
import {
	createPost,
	deletePost,
	getPostsByUser,
	getPostById,
	getPosts,
	updatePost,
	searchPost,
} from "../Controllers/PostController.js";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/search", searchPost);
router.get("/:id", getPostById);
router.get("/user/:user_id", getPostsByUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
