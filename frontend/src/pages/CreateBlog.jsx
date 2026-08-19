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
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="mb-8 sm:mb-10">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2F120F] mt-2 sm:mt-3">
            Create Blog
          </h1>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
            Write and publish a new astrology article.
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-8"
        >
          <div className="mb-5 sm:mb-6">
            <label
              htmlFor="title"
              className="block text-xs sm:text-sm font-medium text-[#2F120F] mb-1.5 sm:mb-2"
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
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#DCCAB0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label
              htmlFor="content"
              className="block text-xs sm:text-sm font-medium text-[#2F120F] mb-1.5 sm:mb-2"
            >
              Content
            </label>

            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article..."
              rows={12}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#DCCAB0] bg-white resize-y focus:outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label
              htmlFor="status"
              className="block text-xs sm:text-sm font-medium text-[#2F120F] mb-1.5 sm:mb-2"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#DCCAB0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1111] text-sm sm:text-base"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/blogs")}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition text-sm sm:text-base font-medium text-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-[#8B1111] text-white hover:bg-[#6F0D0D] transition disabled:opacity-50 text-sm sm:text-base font-medium text-center shadow-sm"
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