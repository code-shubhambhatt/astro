import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blogs";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createBlog(formData);

      navigate("/dashboard/blogs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Create Blog
          </h1>

          <p className="text-gray-600 mt-3">
            Write and publish a new astrology article.
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#2F120F] mb-2"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 rounded-xl border border-[#DCCAB0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1111]"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-[#2F120F] mb-2"
            >
              Content
            </label>

            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article..."
              rows={15}
              className="w-full px-4 py-3 rounded-xl border border-[#DCCAB0] bg-white resize-y focus:outline-none focus:ring-2 focus:ring-[#8B1111]"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-[#2F120F] mb-2"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#DCCAB0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1111]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/blogs")}
              className="px-6 py-3 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#8B1111] text-white hover:bg-[#6F0D0D] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateBlog;