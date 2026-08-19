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
    { name: "Blogs", path: "/blogs" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/dashboard/about" },
    { name: "Services", path: "/dashboard/services" },
    { name: "Testimonials", path: "/dashboard/testimonials" },
    { name: "Blogs", path: "/dashboard/blogs" },
  ];

  const activeLinks = isAdmin ? adminLinks : links;

  function handleLogout() {
    localStorage.removeItem("access_token");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F9F1E4]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-full shadow-md px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">

          {/* Logo */}

          <Link
            to={isAdmin ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B1111] flex items-center justify-center shrink-0">
              <Star
                size={15}
                fill="white"
                color="white"
              />
            </div>

            <span className="font-serif text-2xl sm:text-3xl text-[#2F120F] tracking-tight">
              JyotishHorizon
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            {activeLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 xl:px-5 py-2 rounded-full text-sm xl:text-base transition-all duration-300 ${
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

          <div className="hidden lg:block">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-5 xl:px-7 py-2.5 xl:py-3 rounded-full text-sm xl:text-base font-medium shadow-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-5 xl:px-7 py-2.5 xl:py-3 rounded-full text-sm xl:text-base font-medium shadow-md transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile / Tablet Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden text-[#8B1111] p-1.5 focus:outline-none"
          >
            {menuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

        {/* Mobile / Tablet Menu */}

        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-[85vh] mt-3" : "max-h-0"
          }`}
        >
          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-lg p-4 sm:p-5 max-h-[80vh] overflow-y-auto">

            <div className="space-y-1.5">
              {activeLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition ${
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
                className="block w-full mt-4 bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block mt-4 text-center bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition"
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