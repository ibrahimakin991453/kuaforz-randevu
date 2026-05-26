import { Link } from "react-router-dom";
import type { Service, Staff } from "../../types";

interface BookingSuccessProps {
  service: Service;
  staff: Staff;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}

export function BookingSuccess({
  service,
  staff,
  date,
  time,
  customerName,
  customerPhone,
}: BookingSuccessProps) {
  return (
    <div className="max-w-md mx-auto text-center py-8">
      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Randevunuz Oluşturuldu!</h2>
      <p className="text-dark-300 mb-6">
        Randevunuz onay bekliyor. Admin onayladıktan sonra randevunuz kesinleşecektir.
      </p>

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 text-left space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Hizmet</span>
          <span className="text-sm text-white">{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Personel</span>
          <span className="text-sm text-white">{staff.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Tarih</span>
          <span className="text-sm text-white">{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Saat</span>
          <span className="text-sm text-white">{time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Müşteri</span>
          <span className="text-sm text-white">{customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-dark-300">Telefon</span>
          <span className="text-sm text-white">{customerPhone}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-dark-700">
          <span className="text-sm text-dark-300">Durum</span>
          <span className="text-sm text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded-full">
            Onay Bekliyor
          </span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Link
          to="/track"
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm transition-colors"
        >
          Randevu Takip
        </Link>
        <Link
          to="/booking"
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm transition-colors"
        >
          Yeni Randevu
        </Link>
      </div>
    </div>
  );
}
