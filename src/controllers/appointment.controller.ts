import { Request, Response } from "express";
import * as appointmentService from "../services/appointment.service.js";

export async function createAppointment(req: Request, res: Response): Promise<void> {
  const result = await appointmentService.createAppointment(req.body);
  res.status(201).json({ success: true, data: result });
}

export async function getAppointments(req: Request, res: Response): Promise<void> {
  const { status, date, staffId } = req.query;
  const appointments = await appointmentService.getAppointments({
    status: status as string | undefined,
    date: date as string | undefined,
    staffId: staffId as string | undefined,
  });
  res.json({ success: true, data: appointments });
}

export async function getAppointment(req: Request, res: Response): Promise<void> {
  const appt = await appointmentService.getAppointmentById(String(req.params.id));
  res.json({ success: true, data: appt });
}

export async function getByPhone(req: Request, res: Response): Promise<void> {
  const phone = req.query.phone as string;
  if (!phone) {
    res.status(400).json({ success: false, message: "phone parametresi gerekli" });
    return;
  }
  const appointments = await appointmentService.getAppointmentsByPhone(phone);
  res.json({ success: true, data: appointments });
}

export async function confirmAppointment(req: Request, res: Response): Promise<void> {
  await appointmentService.confirmAppointment(String(req.params.id));
  res.json({ success: true, message: "Randevu onaylandı" });
}

export async function cancelAppointment(req: Request, res: Response): Promise<void> {
  const { reason } = req.body || {};
  await appointmentService.cancelAppointment(String(req.params.id), reason);
  res.json({ success: true, message: "Randevu iptal edildi" });
}

export async function completeAppointment(req: Request, res: Response): Promise<void> {
  await appointmentService.completeAppointment(String(req.params.id));
  res.json({ success: true, message: "Randevu tamamlandı" });
}
