import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/booking", label: "Randevu Al" },
    { to: "/track", label: "Randevu Takip" },
    { to: "/admin/login", label: "Admin Giriş" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-white hover:text-accent transition-colors shrink-0">
            Kuaför Randevu
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-dark-300 hover:text-white transition-colors"
            aria-label="Menü"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <ul className="hidden lg:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === link.to
                      ? "bg-dark-700 text-white"
                      : "text-dark-200 hover:text-white hover:bg-dark-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {menuOpen && (
          <div className="lg:hidden border-t border-dark-700 bg-dark-800">
            <ul className="px-4 py-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      location.pathname === link.to
                        ? "bg-dark-700 text-white"
                        : "text-dark-200 hover:text-white hover:bg-dark-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-dark-800 border-t border-dark-700 py-4 text-center text-dark-300 text-sm">
        Kuaför Randevu Sistemi &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
