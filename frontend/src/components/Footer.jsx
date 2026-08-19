import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { getAbout } from "../api/about";

function Footer() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    getAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error("Failed to load footer contact info:", err));
  }, []);

  return (
    <footer className="bg-[#2F120F] text-[#F9F1E4]">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-3xl">
              JyotishHorizon
            </h2>

            <p className="mt-4 text-[#DCCAB0] leading-7 max-w-sm">
              Traditional Vedic astrology guidance for clarity,
              understanding and meaningful decisions in life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/" className="text-[#DCCAB0] hover:text-white transition">
                Home
              </Link>

              <Link to="/about" className="text-[#DCCAB0] hover:text-white transition">
                About
              </Link>

              <Link to="/services" className="text-[#DCCAB0] hover:text-white transition">
                Services
              </Link>

              <Link to="/testimonials" className="text-[#DCCAB0] hover:text-white transition">
                Testimonials
              </Link>

              <Link to="/blogs" className="text-[#DCCAB0] hover:text-white transition">
                Blogs
              </Link>

              <Link to="/contact" className="text-[#DCCAB0] hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              {about.phone && (
                <a
                  href={`tel:${about.phone}`}
                  className="flex items-start gap-3 text-[#DCCAB0] hover:text-white transition"
                >
                  <Phone size={18} className="mt-1 shrink-0" />
                  <span>{about.phone}</span>
                </a>
              )}

              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="flex items-start gap-3 text-[#DCCAB0] hover:text-white transition"
                >
                  <Mail size={18} className="mt-1 shrink-0" />
                  <span>{about.email}</span>
                </a>
              )}

              {about.address && (
                <div className="flex items-start gap-3 text-[#DCCAB0]">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span>{about.address}</span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-[#5A332E] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-[#BFA99A]">
            © {new Date().getFullYear()} JyotishHorizon. All rights reserved.
          </p>

          <p className="text-sm text-[#BFA99A]">
            Vedic Astrology Consultation
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;