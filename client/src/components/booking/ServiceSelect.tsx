import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { Service } from "../../types";

interface ServiceSelectProps {
  selected: Service | null;
  onSelect: (service: Service) => void;
}

export function ServiceSelect({ selected, onSelect }: ServiceSelectProps) {
  const { request } = useApi<Service[]>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request("/services")
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [request]);

  if (loading) {
    return <div className="text-dark-300 text-center py-12">Yükleniyor...</div>;
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-300">Henüz hizmet eklenmemiş.</p>
        <p className="text-dark-400 text-sm mt-1">
          Lütfen daha sonra tekrar deneyiniz.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Hizmet Seçin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const isSelected = selected?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-dark-700 bg-dark-800 hover:border-dark-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">{service.name}</h3>
                <span className="text-xs px-2 py-1 bg-dark-700 rounded text-dark-300">
                  {service.category}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-dark-300">
                <span>{service.durationMinutes} dk</span>
                <span>{service.price} ₺</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
