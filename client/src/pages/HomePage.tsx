import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-white mb-4">
        Kuaför Randevu Sistemi
      </h1>
      <p className="text-dark-200 text-lg mb-8 max-w-md">
        Kolayca randevu alın, istediğiniz personel ve hizmeti seçin.
      </p>
      <div className="flex gap-4">
        <Link
          to="/booking"
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
        >
          Randevu Al
        </Link>
        <Link
          to="/track"
          className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-medium rounded-lg transition-colors"
        >
          Randevu Takip
        </Link>
      </div>
    </div>
  );
}
