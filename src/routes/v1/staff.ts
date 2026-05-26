import { Router } from "express";
import { adminAuth } from "../../middleware/adminAuth.js";
import * as staffController from "../../controllers/staff.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(staffController.listStaff));
router.get("/:id", asyncHandler(staffController.getStaff));
router.post("/", adminAuth, asyncHandler(staffController.createStaff));
router.put("/:id", adminAuth, asyncHandler(staffController.updateStaff));
router.delete("/:id", adminAuth, asyncHandler(staffController.deactivateStaff));

export default router;
