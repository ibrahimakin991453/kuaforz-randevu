import { useState, useCallback } from "react";
import { useApi, API_BASE } from "../../hooks/useApi";
import { useRealtimePolling } from "../../hooks/useRealtimePolling";
import { Toast, notificationsToToastItems } from "../../components/ui/Toast";
import type { Appointment } from "../../types";

const STATUS_TABS = [
  { key: "", label: "Tümü" },
  { key: "pending", label: "Bekleyen" },
  { key: "confirmed", label: "Onaylanan" },
  { key: "cancelled", label: "İptal" },
  { key: "completed", label: "Tamamlanan" },
];

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Bekliyor" },
  confirmed: { bg: "bg-green-500/20", text: "text-green-400", label: "Onaylandı" },
  cancelled: { bg: "bg-red-500/20", text: "text-red-400", label: "İptal" },
  completed: { bg: "bg-blue-500/20", text: "text-blue-400", label: "Tamamlandı" },
};

export function AppointmentsPage() {
  const { request: apiRequest } = useApi<Appointment[]>();
  const [activeTab, setActiveTab] = useState("");

  const fetcher = useCallback(async (): Promise<Appointment[]> => {
    const url = activeTab
      ? `/appointments?status=${activeTab}`
      : "/appointments";
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_BASE}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const json = await res.json();
    if (!json.success) return [];
    return Array.isArray(json.data) ? (json.data as Appointment[]) : [];
  }, [activeTab]);

  const {
    data: appointments,
    loading,
    newItems,
    clearNewItems,
  } = useRealtimePolling(fetcher, 5000);

  async function handleStatusChange(id: string, action: "confirm" | "cancel" | "complete") {
    try {
      await apiRequest(`/appointments/${id}/${action}`, { method: "PATCH" });
    } catch {}
  }

  const toastItems = notificationsToToastItems(newItems);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-white">Randevular</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Canlı
        </span>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.key
                ? "bg-dark-700 text-white"
                : "text-dark-300 hover:text-white hover:bg-dark-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-dark-300 text-center py-12">Yükleniyor...</div>
      ) : appointments.length === 0 ? (
        <div className="text-dark-300 text-center py-12">
          Henüz randevu bulunmamaktadır.
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appt) => {
            const badge = STATUS_BADGE[appt.status] || STATUS_BADGE.pending;
            return (
              <div
                key={appt.id}
                className="bg-dark-800 border border-dark-700 rounded-xl p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">
                        {appt.customerName}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-sm text-dark-300 space-y-0.5">
                      <p>
                        {appt.serviceName} — {appt.staffName}
                      </p>
                      <p>
                        {appt.date} · {appt.startTime} ({appt.durationMinutes} dk)
                      </p>
                      <p>{appt.customerPhone}</p>
                    </div>
                    {appt.notes && (
                      <p className="text-xs text-dark-400 mt-1">Not: {appt.notes}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {appt.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(appt.id, "confirm")}
                          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => handleStatusChange(appt.id, "cancel")}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                        >
                          İptal
                        </button>
                      </>
                    )}
                    {appt.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(appt.id, "complete")}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Tamamlandı
                        </button>
                        <button
                          onClick={() => handleStatusChange(appt.id, "cancel")}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                        >
                          İptal
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Toast notifications={toastItems} onDismiss={clearNewItems} />
    </div>
  );
}
