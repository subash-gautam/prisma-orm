import { Router } from "express";
import UserRoutes from "./UserRoutes.js";
import PostRoutes from "./PostRoutes.js";
import CommentRoutes from "./CommentRoutes.js";

const router = Router();

router.use("/users", UserRoutes);
router.use("/posts", PostRoutes);
router.use("/comments", CommentRoutes);

export default router;
