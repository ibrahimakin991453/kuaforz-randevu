import { useState, type FormEvent } from "react";
import { useTrackAppointments } from "../hooks/useTrackAppointments";

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  completed: "bg-blue-500/20 text-blue-400",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Onay Bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal Edildi",
  completed: "Tamamlandı",
};

export function TrackPage() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { results, loading, error, searched, trackByPhone } = useTrackAppointments();

  function validatePhone(value: string): boolean {
    const phoneRegex = /^(\+90|0)?[ -]?5\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;
    if (!value.trim()) {
      setPhoneError("Telefon numarası giriniz");
      return false;
    }
    if (!phoneRegex.test(value.trim())) {
      setPhoneError("Geçerli bir telefon numarası giriniz (+90 5XX XXX XX XX)");
      return false;
    }
    setPhoneError("");
    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validatePhone(phone)) {
      trackByPhone(phone.trim());
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Randevu Takip
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError("");
              }}
              placeholder="+90 5XX XXX XX XX"
              className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent transition-colors ${
                phoneError ? "border-red-500" : "border-dark-700"
              }`}
            />
            {phoneError && (
              <p className="text-red-400 text-xs mt-1">{phoneError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? "Aranıyor..." : "Randevularımı Gör"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-dark-300 text-center py-8">Randevularınız sorgulanıyor...</div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2 mb-4">
          {error}
        </div>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <div className="text-center py-8">
          <div className="text-dark-400 mb-2">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="text-dark-300">Henüz randevunuz bulunmamaktadır.</p>
          <p className="text-dark-400 text-sm mt-1">
            Farklı bir telefon numarası ile deneyiniz.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((appt) => (
            <div
              key={appt.id}
              className="bg-dark-800 border border-dark-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{appt.serviceName}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    STATUS_BADGE[appt.status] || STATUS_BADGE.pending
                  }`}
                >
                  {STATUS_LABEL[appt.status] || "Bekliyor"}
                </span>
              </div>
              <div className="text-sm text-dark-300 space-y-1">
                <p>Personel: {appt.staffName}</p>
                <p>
                  {appt.date} · {appt.startTime} - {appt.endTime} ({appt.durationMinutes} dk)
                </p>
                {appt.notes && (
                  <p className="text-dark-400">Not: {appt.notes}</p>
                )}
                {appt.cancelReason && (
                  <p className="text-red-400">İptal sebebi: {appt.cancelReason}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
