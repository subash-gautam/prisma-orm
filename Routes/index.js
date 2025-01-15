import { Router } from "express";
import UserRoutes from "./UserRoutes.js";

const router = Router();

router.use("/api/users", UserRoutes);

export default router;
