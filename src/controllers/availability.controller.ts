import { Request, Response } from "express";
import { getAvailableSlots, getWeekSlots } from "../services/availability.service.js";

export async function getSlotsForDay(req: Request, res: Response): Promise<void> {
  const { staffId } = req.params;
  const date = req.query.date as string | undefined;

  if (!date) {
    res.status(400).json({ success: false, message: "date parametresi gerekli (YYYY-MM-DD)" });
    return;
  }

  const slots = await getAvailableSlots(String(staffId), date);
  res.json({ success: true, data: slots });
}

export async function getSlotsForWeek(req: Request, res: Response): Promise<void> {
  const { staffId } = req.params;
  const startDate = req.query.startDate as string | undefined;

  if (!startDate) {
    res.status(400).json({ success: false, message: "startDate parametresi gerekli (YYYY-MM-DD)" });
    return;
  }

  const weekSlots = await getWeekSlots(String(staffId), startDate);
  res.json({ success: true, data: weekSlots });
}
