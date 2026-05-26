export interface Staff {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  category: string;
  active: boolean;
}

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
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  cancelReason?: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
