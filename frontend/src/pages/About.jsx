import { useState, useEffect } from "react";
import { getAbout } from "../api/about";
import { Link } from "react-router-dom";

function About() {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAbout()
      .then((data) => setAbout(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4]">
        <p className="text-lg text-gray-600">
          Loading About...
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

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero */}

        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[4px] text-[#8B1111] text-xs sm:text-sm font-semibold">
            About Us
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2F120F] mt-3">
            About & Experience
          </h1>

          <p className="max-w-2xl mx-auto mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 leading-7 sm:leading-8">
            Traditional Vedic astrology combined with practical guidance,
            helping people make informed decisions with confidence.
          </p>
        </div>

        {/* Description */}

        <div className="bg-[#FCF6EC] rounded-3xl sm:rounded-4xl border border-[#ECDCC5] shadow-lg p-6 sm:p-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-1 h-10 sm:h-12 rounded-full bg-[#8B1111] shrink-0"></div>

            <div>
              <p className="uppercase tracking-[3px] text-[#8B1111] text-xs sm:text-sm font-semibold">
                About
              </p>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F]">
                Pandit Kamla Prasad Bhatt
              </h2>
            </div>
          </div>

          <p className="text-gray-700 leading-7 sm:leading-9 text-base sm:text-lg">
            {about.description}
          </p>
        </div>

        {/* Milestones */}

        <div className="mt-12 sm:mt-16">
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F] mb-6 sm:mb-8">
            Key Milestones
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {about.milestones?.map((milestone, index) => (
              <div
                key={index}
                className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3E5D4] flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 shrink-0">
                  ⭐
                </div>

                <p className="text-[#2F120F] font-medium leading-6 sm:leading-7 text-sm sm:text-base">
                  {milestone}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach & Ethics */}

        <div className="mt-14 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F] mb-6 sm:mb-8">
            Approach & Ethics
          </h2>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl sm:rounded-4xl shadow-lg p-5 sm:p-8">
            <div className="space-y-4 sm:space-y-5">
              {about.approach_ethics?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-5 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F3E5D4] flex items-center justify-center text-[#8B1111] text-base sm:text-xl shrink-0 font-bold">
                    ✓
                  </div>

                  <p className="text-gray-700 leading-7 sm:leading-8 text-sm sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-14 sm:mt-20">
          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl sm:rounded-4xl shadow-lg p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
              <div>
                <p className="uppercase tracking-[3px] text-[#8B1111] text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                  Need Guidance?
                </p>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#2F120F] mb-3 sm:mb-4">
                  Begin Your Spiritual Journey Today
                </h2>

                <p className="text-gray-600 max-w-2xl leading-7 sm:leading-8 text-sm sm:text-base">
                  Whether you are seeking clarity in your career,
                  relationships, health, or future, personalized
                  Vedic guidance can help you make informed decisions.
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

      </div>
    </section>
  );
}

export default About;