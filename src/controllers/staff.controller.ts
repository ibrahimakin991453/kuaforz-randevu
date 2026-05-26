import { Request, Response } from "express";
import * as staffService from "../services/staff.service.js";

export async function listStaff(req: Request, res: Response): Promise<void> {
  const all = String(req.query.all) === "true";
  const staff = await staffService.getAllStaff(!all);
  res.json({ success: true, data: staff });
}

export async function getStaff(req: Request, res: Response): Promise<void> {
  const staff = await staffService.getStaffById(String(req.params.id));
  res.json({ success: true, data: staff });
}

export async function createStaff(req: Request, res: Response): Promise<void> {
  const result = await staffService.createStaff(req.body);
  res.status(201).json({ success: true, data: result });
}

export async function updateStaff(req: Request, res: Response): Promise<void> {
  await staffService.updateStaff(String(req.params.id), req.body);
  res.json({ success: true, message: "Personel güncellendi" });
}

export async function deactivateStaff(req: Request, res: Response): Promise<void> {
  await staffService.deactivateStaff(String(req.params.id));
  res.json({ success: true, message: "Personel pasifleştirildi" });
}
