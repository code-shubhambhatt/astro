import { useState, useEffect } from "react";
import { getAbout, updateAbout } from "../api/about";

function AdminAbout() {
  const [formData, setFormData] = useState({
    description: "",
    milestones: "",
    approach_ethics: "",
    phone: "",
    email: "",
    address: "",
    facebook: "",
    directions: "",
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
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          facebook: data.facebook || "",
          directions: data.directions || "",
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

        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        facebook: formData.facebook,
        directions: formData.directions,
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
      <div className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">
          Loading About page...
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}

        <div className="mb-8 sm:mb-10">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2F120F] mt-2 sm:mt-3">
            Edit About Page
          </h1>

          <p className="text-gray-600 mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base">
            Update the information displayed across your website.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-2xl sm:rounded-3xl shadow-md overflow-hidden">

            {/* Contact Information */}

            <div className="p-5 sm:p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F]">
                Contact Information
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-5 sm:mb-6">
                Update the contact details and links displayed on the website.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9411120641"
                    className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter complete address"
                    className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Facebook URL
                  </label>

                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Google Maps Directions
                  </label>

                  <input
                    type="url"
                    name="directions"
                    value={formData.directions}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
                  />
                </div>

              </div>

            </div>

            {/* About */}

            <div className="p-5 sm:p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F]">
                About
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-5 sm:mb-6">
                Your main introduction and background.
              </p>

              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Write a short description about Pandit Kamla Prasad Bhatt..."
                className="w-full rounded-xl sm:rounded-2xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
              />

            </div>

            {/* Key Milestones */}

            <div className="p-5 sm:p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F]">
                Key Milestones
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-5 sm:mb-6">
                Add one milestone per line.
              </p>

              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Milestones
              </label>

              <textarea
                name="milestones"
                value={formData.milestones}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl sm:rounded-2xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
              />

            </div>

            {/* Approach & Ethics */}

            <div className="p-5 sm:p-8 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F]">
                Approach & Ethics
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-5 sm:mb-6">
                Add each principle on a separate line.
              </p>

              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Approach & Ethics
              </label>

              <textarea
                name="approach_ethics"
                value={formData.approach_ethics}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl sm:rounded-2xl border border-[#D9C8B2] bg-white px-4 py-2.5 sm:py-3 text-gray-700 outline-none resize-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition text-sm sm:text-base"
              />

            </div>

            {/* Footer */}

            <div className="p-5 sm:px-8 sm:py-6 bg-[#FFF8EF]">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  {successMsg && (
                    <p className="text-xs sm:text-sm text-green-700">
                      {successMsg}
                    </p>
                  )}

                  {error && (
                    <p className="text-xs sm:text-sm text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto bg-[#8B1111] hover:bg-[#6D0D0D] disabled:opacity-60 text-white px-8 py-3 rounded-full font-medium transition text-sm sm:text-base shadow-sm"
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