import type { TimeSlot } from "../../types";

interface SlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  loading: boolean;
  onSelect: (time: string) => void;
}

export function SlotPicker({ slots, selectedTime, loading, onSelect }: SlotPickerProps) {
  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Saat Seçin</h2>
        <div className="text-dark-300 text-center py-8">Müsait saatler kontrol ediliyor...</div>
      </div>
    );
  }

  const availableSlots = slots.filter((s) => s.isAvailable);
  const unavailableCount = slots.length - availableSlots.length;

  if (slots.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Saat Seçin</h2>
        <div className="text-dark-300 text-center py-8">
          Bu tarihte müsait saat bulunmamaktadır.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Saat Seçin</h2>

      {unavailableCount > 0 && (
        <p className="text-xs text-dark-400 mb-3">
          {availableSlots.length} müsait / {slots.length} toplam slot
        </p>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.startTime;
          const isAvailable = slot.isAvailable;

          return (
            <button
              key={slot.startTime}
              onClick={() => isAvailable && onSelect(slot.startTime)}
              disabled={!isAvailable}
              className={`p-2 rounded-lg text-center text-sm transition-all ${
                isSelected
                  ? "bg-accent text-white"
                  : isAvailable
                  ? "bg-dark-800 text-white hover:bg-dark-700 border border-dark-700"
                  : "bg-dark-800/50 text-dark-500 cursor-not-allowed border border-dark-800"
              }`}
            >
              <span className="font-mono">{slot.startTime}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
