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
      <div className="flex items-center justify-center min-h-screen bg-[#F9F1E4]">
        <p className="text-lg text-gray-600">
          Loading services...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F1E4]">
        <p className="text-lg text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }

  const featured = services[0];
  const remaining = services.slice(1);

  return (
    <section className="bg-[#F9F1E4] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#8B1111] text-sm font-semibold">
            Our Services
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Authentic Vedic Astrology Services
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-8">
            Personalized Vedic astrology consultations designed to
            provide clarity, guidance and spiritual insight for every
            important phase of life.
          </p>

        </div>

        {/* Featured Service */}

        {featured && (

          <div className="bg-[#FCF6EC] rounded-4xl shadow-lg border border-[#ECDCC5] p-10 mb-14">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              <div className="flex-1">

                <span className="inline-block bg-[#8B1111] text-white text-xs px-4 py-2 rounded-full mb-5">
                  Featured Service
                </span>

                <h2 className="font-serif text-4xl text-[#2F120F] mb-4">
                  {featured.name}
                </h2>

                <p className="text-gray-700 leading-8 text-lg">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-8">

                  {featured.mode?.map((mode) => (

                    <span
                      key={mode}
                      className="bg-[#F3E5D4] text-[#8B1111] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {mode}
                    </span>

                  ))}

                </div>

              </div>

              <div className="lg:w-64 shrink-0 bg-white rounded-3xl p-8 border border-[#ECDCC5] shadow-sm">

                <p className="uppercase text-xs tracking-widest text-gray-500">
                  Duration
                </p>

                <h3 className="text-3xl font-serif text-[#2F120F] mt-2">
                  {featured.duration}
                </h3>

                <button className="w-full mt-8 bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full transition font-medium">
                  Book Consultation
                </button>

              </div>

            </div>

          </div>

        )}

        {/* Services Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {remaining.map((service) => (

            <div
              key={service._id}
              className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col"
            >

              <div className="flex items-start justify-between mb-5">

                <h2 className="font-serif text-3xl text-[#2F120F] leading-tight">
                  {service.name}
                </h2>

                <span className="text-sm text-[#8B1111] font-semibold whitespace-nowrap ml-4">
                  {service.duration}
                </span>

              </div>

              <p className="text-gray-700 leading-7 grow">
                {service.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                {service.mode?.map((mode) => (

                  <span
                    key={mode}
                    className="bg-[#F3E5D4] text-[#8B1111] px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {mode}
                  </span>

                ))}

              </div>

              <div className="mt-8">
                                <button
                  className="w-full bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition duration-300"
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 bg-[#FCF6EC] rounded-4xl border border-[#ECDCC5] shadow-lg p-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <p className="uppercase tracking-[3px] text-[#8B1111] text-sm font-semibold mb-3">
                Need Personal Guidance?
              </p>

              <h2 className="font-serif text-4xl text-[#2F120F] mb-4">
                Not Sure Which Service Is Right For You?
              </h2>

              <p className="text-gray-600 max-w-2xl leading-8">
                Every individual has unique concerns and circumstances.
                Book a consultation and receive guidance based on your
                birth details and specific questions.
              </p>

            </div>

            <Link to="/contact" 
              className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-10 py-4 rounded-full font-medium transition whitespace-nowrap"
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