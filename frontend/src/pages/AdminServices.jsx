import { useEffect, useState } from "react";
import {
  getAllServices,
  createService,
  updateService,
} from "../api/services";

const initialForm = {
  name: "",
  slug: "",
  description: "",
  mode: "",
  duration: "",
  display_order: 1,
  is_active: true,
};

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadServices() {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
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

  function handleEdit(service) {
    setEditingId(service._id);

    setFormData({
      name: service.name || "",
      slug: service.slug || "",
      description: service.description || "",
      mode: Array.isArray(service.mode)
        ? service.mode.join(", ")
        : service.mode || "",
      duration: service.duration || "",
      display_order: service.display_order ?? 1,
      is_active: service.is_active ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setFormData(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...formData,
      mode: formData.mode
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      display_order: Number(formData.display_order),
    };

    try {
      if (editingId) {
        await updateService(editingId, payload);
        setSuccess("Service updated successfully.");
      } else {
        await createService(payload);
        setSuccess("Service created successfully.");
      }

      resetForm();
      await loadServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(service) {
    try {
      setError("");
      setSuccess("");

      await updateService(service._id, {
        name: service.name,
        slug: service.slug,
        description: service.description,
        mode: service.mode,
        duration: service.duration,
        display_order: service.display_order,
        is_active: !service.is_active,
      });

      setSuccess(
        service.is_active
          ? "Service deactivated successfully."
          : "Service activated successfully."
      );

      await loadServices();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Manage Services
          </h1>

          <p className="text-gray-600 mt-3">
            Add, edit, activate or deactivate your astrology services.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md p-8 mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-3xl text-[#2F120F]">
                {editingId ? "Edit Service" : "Add Service"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Use the existing service schema.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-[#8B1111]"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>

              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>

              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60 minutes"
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>

              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="1"
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none resize-none focus:border-[#8B1111]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modes
              </label>

              <input
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                placeholder="Online, In-person"
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111]"
              />

              <p className="text-xs text-gray-500 mt-1">
                Separate multiple modes with commas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4"
              />

              <label className="text-sm text-gray-700">
                Active service
              </label>
            </div>
          </div>

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
            {saving
              ? "Saving..."
              : editingId
                ? "Update Service"
                : "Create Service"}
          </button>
        </form>

        {/* Services */}

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md overflow-hidden">

          <div className="px-7 py-6 border-b border-[#ECDCC5]">
            <h2 className="font-serif text-3xl text-[#2F120F]">
              Existing Services
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your existing services.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No services found.
            </div>
          ) : (
            <div className="divide-y divide-[#ECDCC5]">

              {services.map((service) => (
                <div
                  key={service._id}
                  className="px-7 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                >

                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-serif text-2xl text-[#2F120F]">
                        {service.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {service.slug}
                    </p>

                    <p className="text-gray-700 mt-2 max-w-3xl">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.mode?.map((mode) => (
                        <span
                          key={mode}
                          className="bg-[#F3E5D4] text-[#8B1111] px-3 py-1 rounded-full text-xs"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">

                    <button
                      onClick={() => handleEdit(service)}
                      className="border border-[#8B1111] text-[#8B1111] hover:bg-[#8B1111] hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggle(service)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                        service.is_active
                          ? "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          : "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      {service.is_active ? "Deactivate" : "Activate"}
                    </button>

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

export default AdminServices;