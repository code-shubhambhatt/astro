import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Edit, Trash2 } from "lucide-react";
import { getBlogById, deleteBlog } from "../api/blogs";

function isHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

function AdminBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogById(id);

        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  async function handleDelete() {
    if (!blog) return;
    const confirmed = window.confirm(`Are you sure you want to delete "${blog.title}"?`);
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteBlog(blog._id);
      navigate("/dashboard/blogs");
    } catch (err) {
      alert("Failed to delete blog: " + err.message);
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading article...</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="min-h-screen bg-[#F9F1E4] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#2F120F]">
            Article not found
          </h1>

          <p className="mt-4 text-gray-600">
            {error || "The requested article could not be found."}
          </p>

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

        {/* Top Navigation */}

        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/blogs"
            className="inline-flex items-center gap-2 text-[#8B1111] hover:text-[#6D0D0D] transition"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={`/dashboard/blogs/${blog._id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition"
            >
              <Edit size={17} />
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition disabled:opacity-50"
            >
              <Trash2 size={17} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Article */}

        <article className="mt-10">

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[3px] text-[#8B1111] font-semibold">
              Vedic Astrology
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {blog.status}
            </span>
          </div>

          <h1
            className={`mt-5 text-4xl lg:text-6xl leading-tight text-[#2F120F] ${
              isHindi(blog.title)
                ? "font-devanagari-serif"
                : "font-serif"
            }`}
          >
            {blog.title}
          </h1>

          {/* Date */}

          <div className="flex items-center gap-2 mt-6 text-gray-500">
            <CalendarDays size={18} />

            <span>
              {blog.created_at
                ? new Date(blog.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Article"}
            </span>
          </div>

          {/* Divider */}

          <div className="border-t border-[#ECDCC5] mt-10 pt-10">
            <div
              className={`text-lg leading-9 text-[#3A2A24] whitespace-pre-line ${
                isHindi(blog.content)
                  ? "font-devanagari-sans"
                  : "font-sans"
              }`}
            >
              {blog.content}
            </div>
          </div>
        </article>

        {/* Bottom Navigation */}

        <div className="border-t border-[#ECDCC5] mt-16 pt-8">
          <Link
            to="/dashboard/blogs"
            className="inline-flex items-center gap-2 text-[#8B1111] font-medium hover:text-[#6D0D0D]"
          >
            <ArrowLeft size={18} />
            Back to Blog Management
          </Link>
        </div>

      </div>
    </section>
  );
}

export default AdminBlogDetails;