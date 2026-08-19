import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../api/blogs";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadBlogs() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBlogs();

      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function handleDelete(id, title) {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Failed to delete blog: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2F120F] mt-2 sm:mt-3">
            Manage Blogs
          </h1>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
            Create, edit and manage your astrology articles.
          </p>
        </div>

        {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-2xl sm:rounded-3xl shadow-md overflow-hidden">
          <div className="p-4 sm:px-7 sm:py-6 border-b border-[#ECDCC5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F]">
                Existing Blogs
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {blogs.length} published or draft articles
              </p>
            </div>

            <Link
              to="/dashboard/blogs/create"
              className="w-full sm:w-auto text-center px-5 py-2.5 sm:py-3 rounded-xl bg-[#8B1111] text-white hover:bg-[#6F0D0D] transition text-sm sm:text-base font-medium shadow-sm"
            >
              Create Blog
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="p-8 sm:p-10 text-center text-gray-500 text-sm sm:text-base">
              No blogs found.
            </div>
          ) : (
            <div className="divide-y divide-[#ECDCC5]">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-4 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#2F120F] leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1 break-all">
                      {blog.slug}
                    </p>

                    <span className="inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {blog.status}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 sm:gap-3 self-start sm:self-center">
                    <Link
                      to={`/dashboard/blogs/${blog._id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition text-xs sm:text-sm font-medium"
                    >
                      <Eye size={16} />
                      Read
                    </Link>

                    <button
                      onClick={() => handleDelete(blog._id, blog.title)}
                      disabled={deletingId === blog._id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition disabled:opacity-50 text-xs sm:text-sm font-medium"
                      title="Delete blog"
                    >
                      <Trash2 size={16} />
                      {deletingId === blog._id ? "Deleting..." : "Delete"}
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

export default AdminBlogs;