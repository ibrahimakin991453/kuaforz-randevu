import { Router } from "express";
import { adminAuth } from "../../middleware/adminAuth.js";
import * as servicesController from "../../controllers/services.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(servicesController.listServices));
router.get("/:id", asyncHandler(servicesController.getService));
router.post("/", adminAuth, asyncHandler(servicesController.createService));
router.put("/:id", adminAuth, asyncHandler(servicesController.updateService));
router.delete("/:id", adminAuth, asyncHandler(servicesController.deactivateService));

export default router;
