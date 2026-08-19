import { useState, useEffect } from "react";
import { getAllTestimonials, createTestimonial } from "../api/testimonials";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_name: "",
    client_occupation: "",
    service_type: "",
    rating: 5,
    quote: "",
  });

  const fetchTestimonials = () => {
    getAllTestimonials()
      .then((data) => setTestimonials(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
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

    createTestimonial(formData)
      .then(() => {
        alert("Testimonial submitted successfully!");
        setFormData({
          client_name: "",
          client_occupation: "",
          service_type: "",
          rating: 5,
          quote: "",
        });
        fetchTestimonials();
      })
      .catch((err) => {
        alert("Failed to submit testimonial: " + err.message);
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
      <div className="flex-1 flex justify-center items-center min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4]">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-[4px] text-[#7C1111] text-xs sm:text-sm font-semibold">
            Testimonials
          </p>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#2F120F] mt-2">
            What Our Clients Say
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-7">
            Read genuine experiences shared by people who have
            consulted Pandit Kamla Prasad Bhatt.
          </p>
        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column - List */}

          <div className="lg:col-span-2 space-y-6">
            {testimonials.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#ECDCC5] shadow p-8 text-center text-gray-500">
                No testimonials available yet. Be the first to share your experience!
              </div>
            ) : (
              testimonials.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#FCF6EC] rounded-2xl sm:rounded-3xl border border-[#ECDCC5] shadow-md p-6 sm:p-8 hover:shadow-xl transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl text-[#2F120F]">
                        {item.client_name}
                      </h2>

                      {item.client_occupation && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                          {item.client_occupation}
                        </p>
                      )}
                    </div>

                    <span className="self-start sm:self-auto bg-[#8B1111] text-white text-xs px-3.5 py-1.5 rounded-full font-medium">
                      {item.service_type}
                    </span>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <span
                        key={index}
                        className="text-yellow-500 text-lg"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="italic text-gray-700 text-base sm:text-lg leading-7 sm:leading-8">
                    "{item.quote}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Right Column - Form */}

          <div className="w-full lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#ECDCC5] shadow-lg p-6 sm:p-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F] mb-2">
                Give Your Testimonial
              </h2>

              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                We'd love to hear about your experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    Occupation
                  </label>

                  <input
                    type="text"
                    name="client_occupation"
                    value={formData.client_occupation}
                    onChange={handleChange}
                    placeholder="Your occupation"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    Service Taken
                  </label>

                  <input
                    type="text"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Kundli Reading"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    Rating
                  </label>

                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    Your Experience
                  </label>

                  <textarea
                    rows={5}
                    name="quote"
                    value={formData.quote}
                    onChange={handleChange}
                    required
                    placeholder="Share your consultation experience..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 resize-none outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B1111] hover:bg-[#6D0D0D] text-white py-3 rounded-full font-medium transition text-sm sm:text-base shadow-md"
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