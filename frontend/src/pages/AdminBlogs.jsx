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
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading blogs...</p>
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
            Manage Blogs
          </h1>

          <p className="text-gray-600 mt-3">
            Create, edit and manage your astrology articles.
          </p>
        </div>

        {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md overflow-hidden">
          <div className="px-7 py-6 border-b border-[#ECDCC5] flex items-center justify-between">
            <h2 className="font-serif text-3xl text-[#2F120F]">
              Existing Blogs
            </h2>

            <Link
              to="/dashboard/blogs/create"
              className="px-5 py-3 rounded-xl bg-[#8B1111] text-white hover:bg-[#6F0D0D] transition"
            >
              Create Blog
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No blogs found.
            </div>
          ) : (
            <div className="divide-y divide-[#ECDCC5]">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="px-7 py-6 flex items-center justify-between gap-6"
                >
                  <div>
                    <h3 className="font-serif text-2xl text-[#2F120F]">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {blog.slug}
                    </p>

                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {blog.status}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      to={`/dashboard/blogs/${blog._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DCCAB0] text-[#2F120F] hover:bg-[#F3E8D6] transition"
                    >
                      <Eye size={17} />
                      Read
                    </Link>

                    <button
                      onClick={() => handleDelete(blog._id, blog.title)}
                      disabled={deletingId === blog._id}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition disabled:opacity-50"
                      title="Delete blog"
                    >
                      <Trash2 size={17} />
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