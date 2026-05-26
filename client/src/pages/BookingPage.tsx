import { useState } from "react";
import { ServiceSelect } from "../components/booking/ServiceSelect";
import { StaffSelect } from "../components/booking/StaffSelect";
import { DatePicker } from "../components/booking/DatePicker";
import { SlotPicker } from "../components/booking/SlotPicker";
import { BookingStepper } from "../components/booking/BookingStepper";
import { CustomerForm } from "../components/booking/CustomerForm";
import { BookingSummary } from "../components/booking/BookingSummary";
import { BookingSuccess } from "../components/booking/BookingSuccess";
import { useApi, API_BASE } from "../hooks/useApi";
import type { Service, Staff, TimeSlot } from "../types";

type BookingStep = "service" | "staff" | "date" | "form" | "confirm";

interface CustomerInfo {
  customerName: string;
  customerPhone: string;
  notes: string;
}

export function BookingPage() {
  const [step, setStep] = useState<BookingStep>("service");
  const [completed, setCompleted] = useState<BookingStep[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    customerName: "",
    customerPhone: "",
    notes: "",
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { request } = useApi<TimeSlot[]>();

  function markCompleted(s: BookingStep) {
    setCompleted((prev) => (prev.includes(s) ? prev : [...prev, s]));
  }

  function goToStep(targetStep: BookingStep) {
    const stepOrder: BookingStep[] = ["service", "staff", "date", "form", "confirm"];
    const targetIdx = stepOrder.indexOf(targetStep);
    const allowed = stepOrder.slice(0, targetIdx).every((s) => completed.includes(s));
    if (allowed || targetStep === "service") {
      setStep(targetStep);
    }
  }

  function handleServiceSelect(service: Service) {
    setSelectedService(service);
    setSelectedStaff(null);
    setSelectedDate(null);
    setSelectedTime(null);
    markCompleted("service");
    setStep("staff");
  }

  function handleStaffSelect(staff: Staff) {
    setSelectedStaff(staff);
    setSelectedDate(null);
    setSelectedTime(null);
    markCompleted("staff");
    setStep("date");
  }

  function handleDateSelect(date: string) {
    setSelectedDate(date);
    setSelectedTime(null);
    loadSlots(date);
  }

  async function loadSlots(date: string) {
    if (!selectedStaff) return;
    setSlotsLoading(true);
    try {
      const data = await request(`/availability/${selectedStaff.id}?date=${date}`);
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Slot yükleme hatası:", err);
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    markCompleted("date");
    setStep("form");
  }

  function handleCustomerSubmit(info: CustomerInfo) {
    setCustomerInfo(info);
    markCompleted("form");
    setStep("confirm");
  }

  async function handleConfirmBooking() {
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) return;

    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          staffId: selectedStaff.id,
          date: selectedDate,
          startTime: selectedTime,
          customerName: customerInfo.customerName,
          customerPhone: customerInfo.customerPhone,
          notes: customerInfo.notes || undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error?.message || json.message || "Randevu oluşturulamadı");
      }
      markCompleted("confirm");
      setBookingSuccess(true);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setBookingLoading(false);
    }
  }

  if (bookingSuccess && selectedService && selectedStaff && selectedDate && selectedTime) {
    return (
      <BookingSuccess
        service={selectedService}
        staff={selectedStaff}
        date={selectedDate}
        time={selectedTime}
        customerName={customerInfo.customerName}
        customerPhone={customerInfo.customerPhone}
      />
    );
  }

  return (
    <div>
      {!bookingSuccess && (
        <BookingStepper
          currentStep={step}
          completedSteps={completed}
          onStepClick={goToStep}
        />
      )}

      {step === "service" && (
        <ServiceSelect
          selected={selectedService}
          onSelect={handleServiceSelect}
        />
      )}

      {step === "staff" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => goToStep("service")} className="text-sm text-dark-300 hover:text-white transition-colors">
              ← Geri
            </button>
            {selectedService && (
              <span className="text-sm text-dark-400">
                Seçilen: {selectedService.name} ({selectedService.durationMinutes} dk · {selectedService.price} ₺)
              </span>
            )}
          </div>
          <StaffSelect selectedService={selectedService} selected={selectedStaff} onSelect={handleStaffSelect} />
        </div>
      )}

      {step === "date" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => goToStep("staff")} className="text-sm text-dark-300 hover:text-white transition-colors">
              ← Geri
            </button>
            {selectedStaff && <span className="text-sm text-dark-400">Personel: {selectedStaff.name}</span>}
          </div>
          <DatePicker selectedDate={selectedDate} onSelect={handleDateSelect} />
          {selectedDate && (
            <div className="mt-6">
              <SlotPicker slots={slots} selectedTime={selectedTime} loading={slotsLoading} onSelect={handleTimeSelect} />
            </div>
          )}
        </div>
      )}

      {step === "form" && (
        <CustomerForm
          initial={customerInfo}
          onSubmit={handleCustomerSubmit}
          onBack={() => goToStep("date")}
        />
      )}

      {step === "confirm" &&
        selectedService &&
        selectedStaff &&
        selectedDate &&
        selectedTime && (
          <BookingSummary
            service={selectedService}
            staff={selectedStaff}
            date={selectedDate}
            time={selectedTime}
            customerName={customerInfo.customerName}
            customerPhone={customerInfo.customerPhone}
            notes={customerInfo.notes}
            loading={bookingLoading}
            error={bookingError}
            onConfirm={handleConfirmBooking}
            onBack={() => goToStep("form")}
            onEdit={(s) => goToStep(s as BookingStep)}
          />
        )}
    </div>
  );
}
