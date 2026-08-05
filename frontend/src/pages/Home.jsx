import { Link } from "react-router-dom";
import {
  Star,
  Clock3,
  Languages,
  Sparkles,
} from "lucide-react";

function Home() {
  return (
    <div className="bg-[#F9F1E4] min-h-screen flex items-center px-4">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden bg-[#FCF6EC] border border-[#F0E3CF] rounded-4xl shadow-xl px-12 py-14">

          {/* Decorative Top Right */}
          <div className="absolute top-8 right-8 opacity-30 text-7xl text-amber-800">
            ✦
          </div>

          {/* Decorative Bottom Left */}
          <div className="absolute bottom-8 left-8 opacity-20 text-6xl text-amber-800">
            ☾
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Image */}
            <div className="flex justify-center w-full lg:w-auto">

              <div className="relative">

                <div className="w-85 h-85 rounded-full border-10 border-white shadow-2xl overflow-hidden">

                  <img
                    src="/src/media/hero.jpeg"
                    alt="Pandit Kamla Prasad Bhatt"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="flex-1">

              <h1 className="font-serif text-5xl lg:text-6xl font-medium text-[#2F120F] leading-tight">
                Pandit Kamla Prasad Bhatt
              </h1>

              <p className="mt-4 text-3xl font-serif text-[#4A241D]">
                26+ Years of Vedic Astrology Practice
              </p>

              <p className="mt-8 text-lg leading-9 text-[#5B4338] max-w-3xl">
                Guiding life decisions through authentic Vedic astrology,
                Kundli analysis, Vastu consultation, Hawan, and personalized
                spiritual guidance for career, marriage, health, finance,
                and auspicious timings.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5 mt-10">

                <Link
                  to="/contact"
                  className="bg-[#7C1111] hover:bg-[#641010] text-white px-10 py-4 rounded-full font-medium transition shadow-md"
                >
                  Book a Consultation
                </Link>

                <Link
                  to="/services"
                  className="border border-[#D89D3F] text-[#7C1111] hover:bg-[#FFF8EC] px-10 py-4 rounded-full font-medium transition"
                >
                  Explore Services
                </Link>

              </div>

              {/* Info Cards */}
              <div className="flex flex-wrap gap-5 mt-10">

                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm">

                  <Star
                    size={20}
                    className="text-[#7C1111]"
                    fill="currentColor"
                  />

                  <span className="text-[#3A2A24]">
                    Certified Vedic Astrologer
                  </span>

                </div>

                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm">

                  <Clock3
                    size={20}
                    className="text-[#7C1111]"
                  />

                  <span className="text-[#3A2A24]">
                    26+ Years Experience
                  </span>

                </div>

                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm">

                  <Languages
                    size={20}
                    className="text-[#7C1111]"
                  />

                  <span className="text-[#3A2A24]">
                    Hindi • Sanskrit • English
                  </span>

                </div>

              </div>

              {/* Bottom Line */}
              <div className="mt-10 pt-6 border-t border-[#E6D5BF]">

                <p className="text-[#5D5044]">
                  Personalized readings by appointment.
                  Virtual consultations available across India and worldwide.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;