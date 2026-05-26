import { Router } from "express";
import * as availabilityController from "../../controllers/availability.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.get("/:staffId", asyncHandler(availabilityController.getSlotsForDay));
router.get("/:staffId/week", asyncHandler(availabilityController.getSlotsForWeek));

export default router;
