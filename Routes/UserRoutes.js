import { Router } from "express";
import {
	createUser,
	getUserById,
	getUsers,
	updateUser,
} from "../Controllers/UserController.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
