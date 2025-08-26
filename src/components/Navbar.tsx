import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onLogout: () => void;
  token: string | null;
}

export default function Navigation({ onLogout, token }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold text-primary cursor-pointer">Philbert Muhire</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <span
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer",
                    isActive(item.href)
                      ? "text-primary font-semibold"
                      : "text-slate-600 hover:text-primary"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {location.pathname === "/admin" && token && (
              <button
                onClick={onLogout}
                className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <span
                  className={cn(
                    "block px-3 py-2 text-base font-medium cursor-pointer",
                    isActive(item.href)
                      ? "text-primary font-semibold"
                      : "text-slate-600 hover:text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {location.pathname === "/admin" && token && (
              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
