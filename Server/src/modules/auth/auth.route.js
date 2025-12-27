//@ts-check

import { Router } from "express";
import authController from "./auth.controller.js";
import { AuthMiddleware } from "../../common/middleware/base.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getMe", AuthMiddleware, authController.getMe);

export default router;