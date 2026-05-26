import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { HomePage } from "./pages/HomePage";
import { BookingPage } from "./pages/BookingPage";
import { TrackPage } from "./pages/TrackPage";
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { AppointmentsPage } from "./pages/admin/AppointmentsPage";
import { StaffPage } from "./pages/admin/StaffPage";
import { ServicesPage } from "./pages/admin/ServicesPage";
import { AdminProfilePage } from "./pages/admin/AdminProfilePage";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/appointments", label: "Randevular" },
    { to: "/admin/staff", label: "Personel" },
    { to: "/admin/services", label: "Hizmetler" },
    { to: "/admin/profile", label: "Profil" },
  ];

  const sidebar = (
    <nav className="flex flex-col gap-1 bg-dark-800 rounded-lg p-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm transition-colors ${
              isActive
                ? "bg-dark-700 text-white"
                : "text-dark-200 hover:text-white hover:bg-dark-700"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <button
        onClick={logout}
        className="px-3 py-2 rounded text-sm text-dark-200 hover:text-white hover:bg-dark-700 transition-colors text-left mt-2"
      >
        Çıkış Yap
      </button>
    </nav>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:hidden flex items-center justify-between mb-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-dark-300 hover:text-white transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <line x1="18" y1="6" x2="6" y2="18" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
            {sidebarOpen && <line x1="6" y1="6" x2="18" y2="18" />}
          </svg>
        </button>
        <span className="text-sm text-dark-400">Admin Menü</span>
      </div>

      <div className="hidden lg:block w-48 shrink-0">{sidebar}</div>

      {sidebarOpen && <div className="lg:hidden">{sidebar}</div>}

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/admin/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
