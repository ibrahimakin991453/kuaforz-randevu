import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { StaffForm } from "../../components/admin/StaffForm";
import type { Staff } from "../../types";

export function StaffPage() {
  const { request } = useApi<Staff[]>();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  async function loadStaff() {
    try {
      const data = await request("/staff?all=true");
      setStaffList(Array.isArray(data) ? data : []);
    } catch {
      setStaffList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  async function handleCreate(data: Record<string, unknown>) {
    await request("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setShowForm(false);
    loadStaff();
  }

  async function handleUpdate(data: Record<string, unknown>) {
    if (!editingStaff) return;
    await request(`/staff/${editingStaff.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setEditingStaff(null);
    loadStaff();
  }

  async function handleDeactivate(id: string) {
    await request(`/staff/${id}`, { method: "DELETE" });
    loadStaff();
  }

  if (loading) {
    return <div className="text-dark-300 text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Personel Yönetimi</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingStaff(null);
          }}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm transition-colors"
        >
          Personel Ekle
        </button>
      </div>

      {(showForm || editingStaff) && (
        <div className="mb-6">
          <StaffForm
            initial={editingStaff}
            onSave={editingStaff ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingStaff(null);
            }}
          />
        </div>
      )}

      {staffList.length === 0 ? (
        <div className="text-dark-300 text-center py-12">
          Henüz personel eklenmemiş.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="bg-dark-800 border border-dark-700 rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{staff.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        staff.active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {staff.active ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-dark-700 rounded text-dark-300">
                      {staff.role}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingStaff(staff);
                      setShowForm(false);
                    }}
                    className="px-3 py-1 text-xs bg-dark-700 hover:bg-dark-600 text-dark-200 rounded transition-colors"
                  >
                    Düzenle
                  </button>
                  {staff.active && (
                    <button
                      onClick={() => handleDeactivate(staff.id)}
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
