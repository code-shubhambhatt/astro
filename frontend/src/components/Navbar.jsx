import { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X, Star } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/dashboard");

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/dashboard/about" },
    { name: "Services", path: "/dashboard/services" },
    { name: "Testimonials", path: "/dashboard/testimonials" },
  ];

  const activeLinks = isAdmin ? adminLinks : links;

  function handleLogout() {
    localStorage.removeItem("access_token");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F9F1E4]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-full shadow-md px-6 h-18 flex items-center justify-between">

          {/* Logo */}

          <Link
            to={isAdmin ? "/dashboard" : "/"}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#8B1111] flex items-center justify-center">
              <Star
                size={16}
                fill="white"
                color="white"
              />
            </div>

            <span className="font-serif text-3xl text-[#2F120F]">
              JyotishHorizon
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden md:flex items-center gap-3">
            {activeLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#8B1111] text-white"
                      : "text-[#3A2A24] hover:bg-[#F4E7D4]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Login / Logout */}

          <div className="hidden md:block">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-7 py-3 rounded-full font-medium shadow-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-7 py-3 rounded-full font-medium shadow-md transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#8B1111]"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-125 mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-lg p-5">

            <div className="space-y-2">
              {activeLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-[#8B1111] text-white"
                        : "text-[#3A2A24] hover:bg-[#F4E7D4]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Login / Logout */}

            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="block w-full mt-5 bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block mt-5 text-center bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition"
              >
                Login
              </Link>
            )}

          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;