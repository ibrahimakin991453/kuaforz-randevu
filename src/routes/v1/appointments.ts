import { Router } from "express";
import { adminAuth } from "../../middleware/adminAuth.js";
import * as appointmentController from "../../controllers/appointment.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(appointmentController.getAppointments));
router.get("/by-phone", asyncHandler(appointmentController.getByPhone));
router.get("/:id", asyncHandler(appointmentController.getAppointment));
router.post("/", asyncHandler(appointmentController.createAppointment));
router.patch("/:id/confirm", adminAuth, asyncHandler(appointmentController.confirmAppointment));
router.patch("/:id/cancel", adminAuth, asyncHandler(appointmentController.cancelAppointment));
router.patch("/:id/complete", adminAuth, asyncHandler(appointmentController.completeAppointment));

export default router;
