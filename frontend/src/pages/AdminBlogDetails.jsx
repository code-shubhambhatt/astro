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
      <section className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading article...</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center px-6">
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
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Top Navigation */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/dashboard/blogs"
            className="inline-flex items-center gap-2 text-[#8B1111] hover:text-[#6D0D0D] transition text-sm sm:text-base font-medium"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to={`/dashboard/blogs/${blog._id}/edit`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition text-xs sm:text-sm font-medium"
            >
              <Edit size={16} />
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition disabled:opacity-50 text-xs sm:text-sm font-medium"
            >
              <Trash2 size={16} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Article */}

        <article className="mt-8 sm:mt-10">

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[3px] text-[#8B1111] font-semibold">
              Vedic Astrology
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {blog.status}
            </span>
          </div>

          <h1
            className={`mt-4 sm:mt-5 text-2xl sm:text-4xl lg:text-5xl leading-tight text-[#2F120F] ${
              isHindi(blog.title)
                ? "font-devanagari-serif"
                : "font-serif"
            }`}
          >
            {blog.title}
          </h1>

          {/* Date */}

          <div className="flex items-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            <CalendarDays size={16} />

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

          <div className="border-t border-[#ECDCC5] mt-8 sm:mt-10 pt-8 sm:pt-10">
            <div
              className={`text-base sm:text-lg leading-7 sm:leading-9 text-[#3A2A24] whitespace-pre-line ${
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

        <div className="border-t border-[#ECDCC5] mt-12 sm:mt-16 pt-6 sm:pt-8">
          <Link
            to="/dashboard/blogs"
            className="inline-flex items-center gap-2 text-[#8B1111] font-medium hover:text-[#6D0D0D] text-sm sm:text-base"
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