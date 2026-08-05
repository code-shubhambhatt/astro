import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, CalendarDays, Globe } from "lucide-react";

function Home() {
  return (
    <section className="bg-[#F9F1E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <span className="inline-flex items-center gap-2 bg-[#FCF6EC] border border-[#ECDCC5] px-5 py-2 rounded-full text-[#8B1111] font-medium shadow-sm">
              <CheckCircle2 size={18} />
              Trusted Vedic Astrologer
            </span>

            <h1 className="mt-8 font-serif text-5xl lg:text-7xl leading-tight text-[#2F120F]">
              Pandit
              <br />
              Kamla Prasad
              <br />
              Bhatt
            </h1>

            <p className="mt-6 text-3xl font-serif text-[#7C1111]">
              26+ Years of Vedic Astrology
            </p>

            <p className="mt-8 text-lg leading-9 text-[#5A4A42] max-w-xl">
              Guiding individuals and families through authentic Vedic
              astrology, Kundli analysis, Hawan, Vastu consultation and
              personalized spiritual guidance for career, marriage, health,
              finance and life's important decisions.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                to="/contact"
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-8 py-4 rounded-full flex items-center gap-2 transition shadow-lg"
              >
                Book Consultation
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/services"
                className="border border-[#8B1111] text-[#8B1111] hover:bg-[#FFF7EE] px-8 py-4 rounded-full transition"
              >
                Explore Services
              </Link>
            </div>

            {/* Features */}

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Certified Vedic Astrologer
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Personalized Birth Chart Analysis
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Online & Offline Consultations
                </span>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-5 mt-14">
              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <h2 className="font-serif text-4xl text-[#8B1111]">26+</h2>

                <p className="mt-2 text-gray-600">Years</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <CalendarDays className="mx-auto text-[#8B1111]" size={28} />

                <p className="mt-3 text-gray-600">By Appointment</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <Globe className="mx-auto text-[#8B1111]" size={28} />

                <p className="mt-3 text-gray-600">Worldwide</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">
            <div className="absolute w-130 h-130 rounded-full bg-[#F2E4D0] blur-3xl opacity-60"></div>

            <div className="relative z-10">
              {/* Decorative Circle */}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-117.5 h-117.5 rounded-full border border-[#E7D6BE]"></div>
              </div>

              {/* Portrait */}

              <div className="relative bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/src/media/hero.jpeg"
                  alt="Pandit Kamla Prasad Bhatt"
                  className="w-107.5 h-107.5 object-cover"
                />
              </div>

              {/* Floating Experience Card */}

              {/* <div className="absolute -left-8 top-16 bg-white rounded-3xl shadow-xl border border-[#ECDCC5] px-6 py-5">
                <h3 className="font-serif text-3xl text-[#8B1111]">26+</h3>

                <p className="text-gray-600 text-sm">Years Experience</p>
              </div> */}

              {/* Floating Consultation Card */}

              {/* <div className="absolute -right-8 bottom-20 bg-white rounded-3xl shadow-xl border border-[#ECDCC5] px-6 py-5">
                <h3 className="font-serif text-2xl text-[#2F120F]">Online</h3>

                <p className="text-gray-600 text-sm">Worldwide Sessions</p>
              </div> */}

              {/* Decorative Star */}

              <div className="absolute -top-6 right-10 text-6xl text-[#D5B58A] opacity-70">
                ✦
              </div>

              {/* Decorative Moon */}

              <div className="absolute -bottom-6 left-6 text-6xl text-[#D5B58A] opacity-40">
                ☾
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
