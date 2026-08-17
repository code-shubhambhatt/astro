import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogById, updateBlog } from "../api/blogs";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogById(id);

        setFormData({
          title: data.title || "",
          content: data.content || "",
          status: data.status || "draft",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id]);

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
      setSaving(true);
      setError("");

      await updateBlog(id, formData);

      navigate(`/dashboard/blogs/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading blog...</p>
      </section>
    );
  }

  if (error && !formData.title) {
    return (
      <section className="min-h-screen bg-[#F9F1E4] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#2F120F]">
            Unable to load blog
          </h1>

          <p className="mt-4 text-gray-600">{error}</p>

          <Link
            to="/dashboard/blogs"
            className="inline-flex items-center gap-2 mt-8 bg-[#8B1111] text-white px-6 py-3 rounded-full"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <Link
          to={`/dashboard/blogs/${id}`}
          className="inline-flex items-center gap-2 text-[#8B1111] hover:text-[#6D0D0D] transition"
        >
          <ArrowLeft size={18} />
          Back to Article
        </Link>

        <div className="mb-10 mt-8">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Edit Blog
          </h1>

          <p className="text-gray-600 mt-3">
            Update your astrology article.
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
              rows={18}
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
            <Link
              to={`/dashboard/blogs/${id}`}
              className="px-6 py-3 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-[#8B1111] text-white hover:bg-[#6F0D0D] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditBlog;