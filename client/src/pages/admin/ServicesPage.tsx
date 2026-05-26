import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ServiceForm } from "../../components/admin/ServiceForm";
import type { Service } from "../../types";

export function ServicesPage() {
  const { request } = useApi<Service[]>();
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  async function loadServices() {
    try {
      const data = await request("/services?all=true");
      setServiceList(Array.isArray(data) ? data : []);
    } catch {
      setServiceList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function handleCreate(data: Record<string, unknown>) {
    await request("/services", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setShowForm(false);
    loadServices();
  }

  async function handleUpdate(data: Record<string, unknown>) {
    if (!editingService) return;
    await request(`/services/${editingService.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setEditingService(null);
    loadServices();
  }

  async function handleDeactivate(id: string) {
    await request(`/services/${id}`, { method: "DELETE" });
    loadServices();
  }

  if (loading) {
    return <div className="text-dark-300 text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Hizmet Yönetimi</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingService(null);
          }}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm transition-colors"
        >
          Hizmet Ekle
        </button>
      </div>

      {(showForm || editingService) && (
        <div className="mb-6">
          <ServiceForm
            initial={editingService}
            onSave={editingService ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingService(null);
            }}
          />
        </div>
      )}

      {serviceList.length === 0 ? (
        <div className="text-dark-300 text-center py-12">
          Henüz hizmet eklenmemiş.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceList.map((svc) => (
            <div
              key={svc.id}
              className="bg-dark-800 border border-dark-700 rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{svc.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-dark-700 rounded text-dark-300">
                      {svc.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        svc.active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {svc.active ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                  <div className="text-sm text-dark-300">
                    {svc.durationMinutes} dk · {svc.price} ₺
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingService(svc);
                      setShowForm(false);
                    }}
                    className="px-3 py-1 text-xs bg-dark-700 hover:bg-dark-600 text-dark-200 rounded transition-colors"
                  >
                    Düzenle
                  </button>
                  {svc.active && (
                    <button
                      onClick={() => handleDeactivate(svc.id)}
                      className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                    >
                      Pasifleştir
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
