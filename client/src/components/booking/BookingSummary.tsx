import type { Service, Staff } from "../../types";

interface BookingSummaryProps {
  service: Service;
  staff: Staff;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  loading: boolean;
  error: string | null;
  onConfirm: () => void;
  onBack: () => void;
  onEdit: (step: string) => void;
}

export function BookingSummary({
  service,
  staff,
  date,
  time,
  customerName,
  customerPhone,
  notes,
  loading,
  error,
  onConfirm,
  onBack,
  onEdit,
}: BookingSummaryProps) {
  const rows = [
    { label: "Hizmet", value: `${service.name} (${service.durationMinutes} dk)`, step: "service" },
    { label: "Personel", value: staff.name, step: "staff" },
    { label: "Tarih", value: date, step: "date" },
    { label: "Saat", value: time, step: "date" },
    { label: "Ad Soyad", value: customerName, step: "form" },
    { label: "Telefon", value: customerPhone, step: "form" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="text-sm text-dark-300 hover:text-white transition-colors"
        >
          ← Geri
        </button>
        <span className="text-sm text-dark-400">Randevu Özeti</span>
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Randevu Özeti</h2>

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 mb-4 space-y-3 max-w-md">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-sm text-dark-300">{row.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">{row.value}</span>
              <button
                onClick={() => onEdit(row.step)}
                className="text-xs text-accent hover:underline"
              >
                Düzenle
              </button>
            </div>
          </div>
        ))}
        {notes && (
          <div className="flex items-start justify-between pt-3 border-t border-dark-700">
            <span className="text-sm text-dark-300">Not</span>
            <span className="text-sm text-dark-200 ml-4 text-right">{notes}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2 mb-4 max-w-md">
          {error}
        </div>
      )}

      <button
        onClick={onConfirm}
        disabled={loading}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {loading ? "Randevu oluşturuluyor..." : "Randevuyu Onayla"}
      </button>
    </div>
  );
}
