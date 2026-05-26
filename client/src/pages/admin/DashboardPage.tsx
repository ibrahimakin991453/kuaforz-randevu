import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import type { Appointment } from "../../types";

export function DashboardPage() {
  const { request } = useApi<Appointment[]>();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ today: 0, pending: 0, confirmed: 0 });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    request(`/appointments?date=${today}`)
      .then((data) => {
        const apps = (Array.isArray(data) ? data : []) as Appointment[];
        setStats({
          today: apps.length,
          pending: apps.filter((a) => a.status === "pending").length,
          confirmed: apps.filter((a) => a.status === "confirmed").length,
        });
      })
      .catch(() => {});
  }, [request]);

  const statCards = [
    { label: "Bugünkü Randevular", value: stats.today, color: "bg-accent/20 text-accent" },
    { label: "Bekleyen", value: stats.pending, color: "bg-yellow-500/20 text-yellow-400" },
    { label: "Onaylanan", value: stats.confirmed, color: "bg-green-500/20 text-green-400" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} rounded-xl p-5 border border-dark-700`}
          >
            <p className="text-sm opacity-80">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Hızlı İşlemler</h3>
        <div className="flex flex-wrap gap-3 mt-3">
          <button
            onClick={() => navigate("/admin/appointments")}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors text-sm"
          >
            Tüm Randevuları Gör
          </button>
          <button
            onClick={() => navigate("/admin/staff")}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors text-sm"
          >
            Personel Yönetimi
          </button>
          <button
            onClick={() => navigate("/admin/services")}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors text-sm"
          >
            Hizmet Yönetimi
          </button>
        </div>
      </div>
    </div>
  );
}
