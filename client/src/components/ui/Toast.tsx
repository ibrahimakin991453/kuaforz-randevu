import { useEffect, useState } from "react";
import type { Appointment } from "../../types";

interface ToastNotification {
  id: string;
  messages: string[];
}

interface ToastProps {
  notifications: ToastNotification[];
  onDismiss: (id: string) => void;
}

export function Toast({ notifications, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const n of notifications) {
      next[n.id] = true;
    }
    setVisible(next);

    const timers = notifications.map((n) =>
      setTimeout(() => {
        setVisible((prev) => ({ ...prev, [n.id]: false }));
        setTimeout(() => onDismiss(n.id), 300);
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 shadow-lg max-w-sm transition-all duration-300 ${
            visible[n.id] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-dark-300 mb-0.5">Yeni Randevu</p>
              {n.messages.map((msg, i) => (
                <p key={i} className="text-sm text-white">
                  {msg}
                </p>
              ))}
            </div>
            <button
              onClick={() => {
                setVisible((prev) => ({ ...prev, [n.id]: false }));
                setTimeout(() => onDismiss(n.id), 300);
              }}
              className="text-dark-400 hover:text-white shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function notificationsToToastItems(appointments: Appointment[]): ToastNotification[] {
  if (appointments.length === 0) return [];

  return [
    {
      id: `batch-${Date.now()}`,
      messages: appointments.map(
        (a) => `${a.customerName} — ${a.serviceName} (${a.date} ${a.startTime})`
      ),
    },
  ];
}
