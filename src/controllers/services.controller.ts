import { Request, Response } from "express";
import * as servicesService from "../services/services.service.js";

export async function listServices(req: Request, res: Response): Promise<void> {
  const all = String(req.query.all) === "true";
  const services = await servicesService.getAllServices(!all);
  res.json({ success: true, data: services });
}

export async function getService(req: Request, res: Response): Promise<void> {
  const service = await servicesService.getServiceById(String(req.params.id));
  res.json({ success: true, data: service });
}

export async function createService(req: Request, res: Response): Promise<void> {
  const result = await servicesService.createService(req.body);
  res.status(201).json({ success: true, data: result });
}

export async function updateService(req: Request, res: Response): Promise<void> {
  await servicesService.updateService(String(req.params.id), req.body);
  res.json({ success: true, message: "Hizmet güncellendi" });
}

export async function deactivateService(req: Request, res: Response): Promise<void> {
  await servicesService.deactivateService(String(req.params.id));
  res.json({ success: true, message: "Hizmet pasifleştirildi" });
}
