import { Router } from "express";
import { adminAuth } from "../../middleware/adminAuth.js";
import { adminLogin, adminVerify, adminChangePassword } from "../../controllers/admin.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.post("/login", asyncHandler(adminLogin));
router.get("/verify", adminAuth, asyncHandler(adminVerify));
router.patch("/change-password", adminAuth, asyncHandler(adminChangePassword));

export default router;
