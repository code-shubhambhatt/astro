import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getPublishedBlogs } from "../api/blogs";

function isHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getPublishedBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            From the Blog
          </p>

          <h1 className="mt-3 font-serif text-5xl lg:text-6xl text-[#2F120F]">
            Vedic Astrology Insights
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#5A4A42]">
            Explore articles on Vedic astrology, spirituality, planetary
            influences and practical guidance for everyday life.
          </p>
        </div>

        {/* States */}

        {loading ? (
          <div className="mt-16 text-center text-gray-500">
            Loading articles...
          </div>
        ) : error ? (
          <div className="mt-16 text-center text-red-600">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="mt-16 text-center text-gray-500">
            No articles available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl p-7 shadow-md flex flex-col"
              >
                <div className="flex-1">

                  <span className="text-xs uppercase tracking-[2px] text-[#8B1111] font-semibold">
                    Vedic Astrology
                  </span>

                  <h2
                    className={`mt-4 text-2xl text-[#2F120F] ${
                      isHindi(blog.title)
                        ? "font-devanagari-serif"
                        : "font-serif"
                    }`}
                  >
                    {blog.title}
                  </h2>

                  <p
                    className={`mt-4 text-gray-600 leading-7 line-clamp-4 ${
                      isHindi(blog.content)
                        ? "font-devanagari-sans"
                        : "font-sans"
                    }`}
                  >
                    {blog.content}
                  </p>
                </div>

               <Link
                    to={`/blogs/${blog._id}`}
                    className="mt-7 text-[#8B1111] font-medium hover:text-[#6D0D0D] flex items-center gap-2"
                    >
                    Read Article
                    <ArrowRight size={17} />
                </Link>

              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Blogs;