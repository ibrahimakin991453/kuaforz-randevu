import { Router } from "express";
import adminRoutes from "./v1/admin.js";
import staffRoutes from "./v1/staff.js";
import servicesRoutes from "./v1/services.js";
import availabilityRoutes from "./v1/availability.js";
import appointmentsRoutes from "./v1/appointments.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/staff", staffRoutes);
router.use("/services", servicesRoutes);
router.use("/availability", availabilityRoutes);
router.use("/appointments", appointmentsRoutes);

export default router;
