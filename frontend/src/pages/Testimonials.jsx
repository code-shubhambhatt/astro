import { useState, useEffect } from "react";
import { getAllTestimonials } from "../api/testimonials";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_name: "",
    client_occupation: "",
    rating: 5,
    quote: "",
  });

  useEffect(() => {
    getAllTestimonials()
      .then((data) => setTestimonials(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Testimonial submission will be added soon.");

    setFormData({
      client_name: "",
      client_occupation: "",
      rating: 5,
      quote: "",
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg text-gray-500">
          Loading testimonials...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#F9F1E4] h-100vh overflow-hidden">

      <div className="max-w-7xl mx-auto h-full px-6 py-8 flex flex-col">

        {/* Heading */}

        <div className="text-center mb-8 shrink-0">

          <p className="uppercase tracking-[4px] text-[#7C1111] text-sm font-semibold">
            Testimonials
          </p>

          <h1 className="text-5xl font-serif text-[#2F120F] mt-2">
            What Our Clients Say
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Read genuine experiences shared by people who have
            consulted Pandit Kamla Prasad Bhatt.
          </p>

        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-3 gap-8 flex-1 min-h-0">

          {/* Left Column */}

          <div className="lg:col-span-2 overflow-y-auto pr-3 space-y-6">

            {testimonials.length === 0 ? (

              <div className="bg-white rounded-3xl shadow p-8 text-center">
                No testimonials available.
              </div>

            ) : (

              testimonials.map((item) => (

                <div
                  key={item._id}
                  className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-8 hover:shadow-xl transition"
                >

                  <div className="flex justify-between items-start mb-5">

                    <div>

                      <h2 className="font-serif text-3xl text-[#2F120F]">
                        {item.client_name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {item.client_occupation}
                      </p>

                    </div>

                    <span className="bg-[#8B1111] text-white text-xs px-4 py-2 rounded-full">
                      {item.service_type}
                    </span>

                  </div>

                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <span
                        key={index}
                        className="text-yellow-500 text-xl"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="italic text-gray-700 text-xl leading-9">
                    "{item.quote}"
                  </p>

                </div>

              ))

            )}

          </div>
                    {/* Right Column */}

          <div className="h-full">

            <div className="sticky top-6 bg-white rounded-3xl border border-[#ECDCC5] shadow-lg p-8">

              <h2 className="font-serif text-4xl text-[#2F120F] mb-2">
                Give Your Testimonial
              </h2>

              <p className="text-gray-600 mb-8">
                We'd love to hear about your experience.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B1111]"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Occupation
                  </label>

                  <input
                    type="text"
                    name="occupation"
                    value={formData.client_occupation}
                    onChange={handleChange}
                    required
                    placeholder="Your occupation"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B1111]"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Rating
                  </label>

                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B1111]"
                  >
                    <option value={5}>★★★★★ (5)</option>
                    <option value={4}>★★★★☆ (4)</option>
                    <option value={3}>★★★☆☆ (3)</option>
                    <option value={2}>★★☆☆☆ (2)</option>
                    <option value={1}>★☆☆☆☆ (1)</option>
                  </select>

                </div>

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Your Experience
                  </label>

                  <textarea
                    rows={7}
                    name="testimonial"
                    value={formData.quote}
                    onChange={handleChange}
                    required
                    placeholder="Share your experience..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-[#8B1111]"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition"
                >
                  Submit Testimonial
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;