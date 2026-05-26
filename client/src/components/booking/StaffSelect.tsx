import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { Staff, Service } from "../../types";

interface StaffSelectProps {
  selectedService: Service | null;
  selected: Staff | null;
  onSelect: (staff: Staff) => void;
}

export function StaffSelect({ selected, onSelect }: StaffSelectProps) {
  const { request } = useApi<Staff[]>();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request("/staff")
      .then((data) => setStaff(Array.isArray(data) ? data : []))
      .catch(() => setStaff([]))
      .finally(() => setLoading(false));
  }, [request]);

  if (loading) {
    return <div className="text-dark-300 text-center py-12">Yükleniyor...</div>;
  }

  if (staff.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-300">Henüz personel eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Personel Seçin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {staff.map((s) => {
          const isSelected = selected?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-dark-700 bg-dark-800 hover:border-dark-600"
              }`}
            >
              <h3 className="text-white font-medium">{s.name}</h3>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-dark-700 rounded text-dark-300">
                {s.role}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
