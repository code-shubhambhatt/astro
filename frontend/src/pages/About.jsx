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
      <div className="flex items-center justify-center min-h-screen bg-[#F9F1E4]">
        <p className="text-lg text-gray-600">
          Loading About...
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

  return (
    <section className="bg-[#F9F1E4] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#8B1111] text-sm font-semibold">
            About Us
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            About & Experience
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-8">
            Traditional Vedic astrology combined with practical guidance,
            helping people make informed decisions with confidence.
          </p>

        </div>

        {/* Description */}

        <div className="bg-[#FCF6EC] rounded-[32px] border border-[#ECDCC5] shadow-lg p-10">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-1 h-12 rounded-full bg-[#8B1111]"></div>

            <div>

              <p className="uppercase tracking-[3px] text-[#8B1111] text-sm font-semibold">
                About
              </p>

              <h2 className="font-serif text-4xl text-[#2F120F]">
                Pandit Kamla Prasad Bhatt
              </h2>

            </div>

          </div>

          <p className="text-gray-700 leading-9 text-lg">
            {about.description}
          </p>

        </div>

        {/* Milestones */}

        <div className="mt-16">

          <h2 className="font-serif text-4xl text-[#2F120F] mb-8">
            Key Milestones
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {about.milestones?.map((milestone, index) => (

              <div
                key={index}
                className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-7"
              >

                <div className="w-12 h-12 rounded-full bg-[#F3E5D4] flex items-center justify-center text-xl mb-5">
                  ⭐
                </div>

                <p className="text-[#2F120F] font-medium leading-7">
                  {milestone}
                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Approach & Ethics */}

        <div className="mt-20">

          <h2 className="font-serif text-4xl text-[#2F120F] mb-8">
            Approach & Ethics
          </h2>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-[32px] shadow-lg p-8">

            <div className="space-y-5">

              {about.approach_ethics?.map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-5 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
                >

                  <div className="w-12 h-12 rounded-full bg-[#F3E5D4] flex items-center justify-center text-[#8B1111] text-xl shrink-0">
                    ✓
                  </div>

                  <p className="text-gray-700 leading-8">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-20">

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-[32px] shadow-lg p-10">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              <div>

                <p className="uppercase tracking-[3px] text-[#8B1111] text-sm font-semibold mb-3">
                  Need Guidance?
                </p>

                <h2 className="font-serif text-4xl text-[#2F120F] mb-4">
                  Begin Your Spiritual Journey Today
                </h2>

                <p className="text-gray-600 max-w-2xl leading-8">
                  Whether you are seeking clarity in your career,
                  relationships, health, or future, personalized
                  Vedic guidance can help you make informed decisions.
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

      </div>

    </section>
  );
}

export default About;