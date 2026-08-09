import { useState, useEffect } from "react";
import { getAbout, updateAbout } from "../api/about";

function AdminAbout() {
  const [formData, setFormData] = useState({
    description: "",
    milestones: "",
    approach_ethics: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getAbout()
      .then((data) => {
        setFormData({
          description: data.description || "",
          milestones: (data.milestones || []).join("\n"),
          approach_ethics: (data.approach_ethics || []).join("\n"),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setSuccessMsg("");
    setError("");

    try {
      const payload = {
        description: formData.description,

        milestones: formData.milestones
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0),

        approach_ethics: formData.approach_ethics
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0),
      };

      await updateAbout(payload);

      setSuccessMsg("About page updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">
          Loading About page...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="mb-10">

          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Edit About Page
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl">
            Update the information displayed on your About page.
          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md overflow-hidden">

            {/* Description */}

            <div className="p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-3xl text-[#2F120F]">
                About
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-6">
                Your main introduction and background.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Write a short description about Pandit Kamla Prasad Bhatt..."
                className="w-full rounded-2xl border border-[#D9C8B2] bg-white px-4 py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition"
              />

            </div>

            {/* Milestones */}

            <div className="p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-3xl text-[#2F120F]">
                Key Milestones
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-6">
                Add one milestone per line.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Milestones
              </label>

              <textarea
                name="milestones"
                value={formData.milestones}
                onChange={handleChange}
                rows={7}
                placeholder={`26+ years of Vedic astrology practice
Serving clients across India
Specialized in Kundli and Vastu`}
                className="w-full rounded-2xl border border-[#D9C8B2] bg-white px-4 py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition"
              />

            </div>

            {/* Approach & Ethics */}

            <div className="p-8">

              <h2 className="font-serif text-3xl text-[#2F120F]">
                Approach & Ethics
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-6">
                Add each principle on a separate line.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approach & Ethics
              </label>

              <textarea
                name="approach_ethics"
                value={formData.approach_ethics}
                onChange={handleChange}
                rows={7}
                placeholder={`Traditional Vedic principles
Honest and practical guidance
Respect for individual beliefs`}
                className="w-full rounded-2xl border border-[#D9C8B2] bg-white px-4 py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition"
              />

            </div>

            {/* Footer */}

            <div className="px-8 py-6 bg-[#FFF8EF] border-t border-[#ECDCC5]">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  {successMsg && (
                    <p className="text-sm text-green-700">
                      {successMsg}
                    </p>
                  )}

                  {error && (
                    <p className="text-sm text-red-600">
                      {error}
                    </p>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#8B1111] hover:bg-[#6D0D0D] disabled:opacity-60 text-white px-8 py-3 rounded-full font-medium transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </div>

          </div>

        </form>

      </div>
    </section>
  );
}

export default AdminAbout;