// Personel
export interface Staff {
  id: string;
  name: string;
  role: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Hizmet
export type ServiceCategory = "Kesim" | "Boyama" | "Bakım" | "Diğer";

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  category: ServiceCategory;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Randevu
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Appointment {
  id: string;
  staffId: string;
  staffName: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  price: number;
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  cancelReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Müsaitlik slot
export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Admin
export interface AdminSettings {
  adminPasswordHash: string;
}

// Slot lock (concurrent booking prevention)
export interface TimeSlotLock {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  locked: boolean;
  expiresAt: string;
  createdAt?: string;
}
