import { useEffect, useState } from "react";
import {
  getAllTestimonials,
  updateTestimonial,
} from "../api/testimonials";

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    client_name: "",
    client_occupation: "",
    service_type: "",
    quote: "",
    rating: 5,
    is_visible: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadTestimonials() {
    try {
      setLoading(true);

      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  }

  function handleEdit(testimonial) {
    setEditingId(testimonial._id);

    setFormData({
      client_name: testimonial.client_name || "",
      client_occupation: testimonial.client_occupation || "",
      service_type: testimonial.service_type || "",
      quote: testimonial.quote || "",
      rating: testimonial.rating ?? 5,
      is_visible: testimonial.is_visible ?? true,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      client_name: "",
      client_occupation: "",
      service_type: "",
      quote: "",
      rating: 5,
      is_visible: true,
    });

    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!editingId) {
      setError("Only editing existing testimonials is available here.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      client_name: formData.client_name,
      client_occupation: formData.client_occupation,
      service_type: formData.service_type,
      quote: formData.quote,
      rating: Number(formData.rating),
      is_visible: formData.is_visible,
    };

    try {
      await updateTestimonial(editingId, payload);

      setSuccess("Testimonial updated successfully.");

      resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(testimonial) {
    try {
      setError("");
      setSuccess("");

      await updateTestimonial(testimonial._id, {
        client_name: testimonial.client_name,
        client_occupation: testimonial.client_occupation,
        service_type: testimonial.service_type,
        quote: testimonial.quote,
        rating: testimonial.rating,
        is_visible: !testimonial.is_visible,
      });

      setSuccess(
        testimonial.is_visible
          ? "Testimonial hidden successfully."
          : "Testimonial made visible successfully."
      );

      await loadTestimonials();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">
          Loading testimonials...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Manage Testimonials
          </h1>

          <p className="text-gray-600 mt-3">
            Edit, hide or show client testimonials.
          </p>
        </div>

        {/* Edit Form */}

        {editingId && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md p-8 mb-10"
          >
            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="font-serif text-3xl text-[#2F120F]">
                  Edit Testimonial
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update the testimonial information.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-[#8B1111]"
              >
                Cancel Edit
              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Client Name */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>

                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
                />
              </div>

              {/* Occupation */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>

                <input
                  type="text"
                  name="client_occupation"
                  value={formData.client_occupation}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
                />
              </div>

              {/* Service */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>

                <input
                  type="text"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
                />
              </div>

              {/* Rating */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>

                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              {/* Quote */}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial
                </label>

                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none resize-none focus:border-[#8B1111]"
                />
              </div>

              {/* Visibility */}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_visible"
                  checked={formData.is_visible}
                  onChange={handleChange}
                  className="w-4 h-4"
                />

                <label className="text-sm text-gray-700">
                  Visible on website
                </label>
              </div>

            </div>

            {/* Messages */}

            {(error || success) && (
              <div className="mt-6">
                {error && (
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="text-sm text-green-700">
                    {success}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-6 bg-[#8B1111] hover:bg-[#6D0D0D] disabled:opacity-60 text-white px-8 py-3 rounded-full font-medium transition"
            >
              {saving ? "Saving..." : "Update Testimonial"}
            </button>

          </form>
        )}

        {/* Testimonials List */}

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md overflow-hidden">

          <div className="px-7 py-6 border-b border-[#ECDCC5]">
            <h2 className="font-serif text-3xl text-[#2F120F]">
              Existing Testimonials
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage client feedback displayed on the website.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No testimonials found.
            </div>
          ) : (
            <div className="divide-y divide-[#ECDCC5]">

              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="px-7 py-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-serif text-2xl text-[#2F120F]">
                          {testimonial.client_name}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            testimonial.is_visible
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {testimonial.is_visible
                            ? "Visible"
                            : "Hidden"}
                        </span>

                      </div>

                      {testimonial.client_occupation && (
                        <p className="text-sm text-gray-500 mt-1">
                          {testimonial.client_occupation}
                        </p>
                      )}

                      <p className="text-[#8B1111] font-medium mt-3">
                        {testimonial.service_type}
                      </p>

                      <div className="flex gap-1 mt-3">
                        {Array.from(
                          { length: testimonial.rating || 0 },
                          (_, index) => (
                            <span
                              key={index}
                              className="text-yellow-500"
                            >
                              ★
                            </span>
                          )
                        )}
                      </div>

                      <p className="mt-4 max-w-3xl text-gray-700 italic">
                        "{testimonial.quote}"
                      </p>

                    </div>

                    {/* Actions */}

                    <div className="flex gap-3 shrink-0">

                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="border border-[#8B1111] text-[#8B1111] hover:bg-[#8B1111] hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleToggle(testimonial)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                          testimonial.is_visible
                            ? "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            : "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        }`}
                      >
                        {testimonial.is_visible
                          ? "Hide"
                          : "Show"}
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default AdminTestimonials;