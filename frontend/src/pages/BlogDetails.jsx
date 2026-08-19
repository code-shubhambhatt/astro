import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getBlogById } from "../api/blogs";

function isHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        setError("");
        const data = await getBlogById(id);

        if (!data) {
          throw new Error("Article not found");
        }

        setBlog(data);
      } catch (err) {
        setError(err.message || "Article not found");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading article...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex-1 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] bg-[#F9F1E4] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#2F120F]">
            Article not found
          </h1>

          <p className="mt-4 text-gray-600">{error}</p>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 mt-8 bg-[#8B1111] text-white px-6 py-3 rounded-full"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Back */}

        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-[#8B1111] hover:text-[#6D0D0D] transition text-sm sm:text-base font-medium"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        {/* Article Header */}

        <article className="mt-8 sm:mt-10">
          <span className="text-xs uppercase tracking-[3px] text-[#8B1111] font-semibold">
            Vedic Astrology
          </span>

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
                : "Published article"}
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
            to="/blogs"
            className="inline-flex items-center gap-2 text-[#8B1111] font-medium hover:text-[#6D0D0D] text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;