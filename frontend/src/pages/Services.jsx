import { useState, useEffect } from "react";
import { getAllServices } from "../api/services";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllServices()
      .then((data) => setServices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4]">
        <p className="text-lg text-gray-600">
          Loading services...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4]">
        <p className="text-lg text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }

  const featured = services[0];
  const remaining = services.slice(1);

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero */}

        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[4px] text-[#8B1111] text-xs sm:text-sm font-semibold">
            Our Services
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2F120F] mt-3">
            Authentic Vedic Astrology Services
          </h1>

          <p className="max-w-2xl mx-auto mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 leading-7 sm:leading-8">
            Personalized Vedic astrology consultations designed to
            provide clarity, guidance and spiritual insight for every
            important phase of life.
          </p>
        </div>

        {/* Featured Service */}

        {featured && (
          <div className="bg-[#FCF6EC] rounded-3xl sm:rounded-4xl shadow-lg border border-[#ECDCC5] p-6 sm:p-10 mb-10 sm:mb-14">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-10">

              <div className="flex-1">
                <span className="inline-block bg-[#8B1111] text-white text-xs px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 font-medium">
                  Featured Service
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F] mb-3 sm:mb-4">
                  {featured.name}
                </h2>

                <p className="text-gray-700 leading-7 sm:leading-8 text-base sm:text-lg">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                  {featured.mode?.map((mode) => (
                    <span
                      key={mode}
                      className="bg-[#F3E5D4] text-[#8B1111] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#ECDCC5] shadow-sm flex flex-col justify-between">
                <div>
                  <p className="uppercase text-xs tracking-widest text-gray-500 font-semibold">
                    Duration
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2F120F] mt-2">
                    {featured.duration}
                  </h3>
                </div>

                <Link
                  to="/contact"
                  className="w-full mt-6 text-center bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full transition font-medium text-sm sm:text-base"
                >
                  Book Consultation
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Services Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remaining.map((service) => (
            <div
              key={service._id}
              className="bg-[#FCF6EC] rounded-2xl sm:rounded-3xl border border-[#ECDCC5] shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#2F120F] leading-snug">
                    {service.name}
                  </h2>

                  <span className="text-xs sm:text-sm text-[#8B1111] font-semibold whitespace-nowrap shrink-0 bg-[#F3E5D4] px-2.5 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>

                <p className="text-gray-700 leading-6 sm:leading-7 text-sm sm:text-base">
                  {service.description}
                </p>

                <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                  {service.mode?.map((mode) => (
                    <span
                      key={mode}
                      className="bg-[#F3E5D4] text-[#8B1111] px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-[#ECDCC5]/60">
                <Link
                  to="/contact"
                  className="block w-full text-center bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-2.5 sm:py-3 rounded-full font-medium transition text-sm sm:text-base"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-14 sm:mt-20 bg-[#FCF6EC] rounded-3xl sm:rounded-4xl border border-[#ECDCC5] shadow-lg p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div>
              <p className="uppercase tracking-[3px] text-[#8B1111] text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Need Personal Guidance?
              </p>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F] mb-3 sm:mb-4">
                Not Sure Which Service Is Right For You?
              </h2>

              <p className="text-gray-600 max-w-2xl leading-7 sm:leading-8 text-sm sm:text-base">
                Every individual has unique concerns and circumstances.
                Book a consultation and receive guidance based on your
                birth details and specific questions.
              </p>
            </div>

            <Link
              to="/contact"
              className="w-full sm:w-auto text-center bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-medium transition"
            >
              Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;