import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getPublishedBlogs } from "../api/blogs";

function Home() {
  function isHindi(text) {
    return /[\u0900-\u097F]/.test(text);
  }
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState("");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getPublishedBlogs();
        setBlogs(data);
      } catch (err) {
        setBlogError(err.message);
      } finally {
        setBlogLoading(false);
      }
    }

    loadBlogs();
  }, []);

  return (
    <section className="bg-[#F9F1E4] overflow-hidden">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <span className="inline-flex items-center gap-2 bg-[#FCF6EC] border border-[#ECDCC5] px-5 py-2 rounded-full text-[#8B1111] font-medium shadow-sm">
              <CheckCircle2 size={18} />
              Trusted Vedic Astrologer
            </span>

            <h1 className="mt-8 font-serif text-5xl lg:text-7xl leading-tight text-[#2F120F]">
              Pandit
              <br />
              Kamla Prasad
              <br />
              Bhatt
            </h1>

            <p className="mt-6 text-3xl font-serif text-[#7C1111]">
              26+ Years of Vedic Astrology
            </p>

            <p className="mt-8 text-lg leading-9 text-[#5A4A42] max-w-xl">
              Guiding individuals and families through authentic Vedic
              astrology, Kundli analysis, Hawan, Vastu consultation and
              personalized spiritual guidance for career, marriage, health,
              finance and life's important decisions.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                to="/contact"
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-8 py-4 rounded-full flex items-center gap-2 transition shadow-lg"
              >
                Book Consultation
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/services"
                className="border border-[#8B1111] text-[#8B1111] hover:bg-[#FFF7EE] px-8 py-4 rounded-full transition"
              >
                Explore Services
              </Link>
            </div>

            {/* Features */}

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Certified Vedic Astrologer
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Personalized Birth Chart Analysis
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#8B1111]" />

                <span className="text-[#3A2A24]">
                  Online & Offline Consultations
                </span>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-5 mt-14">
              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <h2 className="font-serif text-4xl text-[#8B1111]">26+</h2>

                <p className="mt-2 text-gray-600">Years</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <CalendarDays
                  className="mx-auto text-[#8B1111]"
                  size={28}
                />

                <p className="mt-3 text-gray-600">By Appointment</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6 text-center">
                <Globe className="mx-auto text-[#8B1111]" size={28} />

                <p className="mt-3 text-gray-600">Worldwide</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">
            <div className="absolute w-130 h-130 rounded-full bg-[#F2E4D0] blur-3xl opacity-60"></div>

            <div className="relative z-10">
              {/* Decorative Circle */}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-117.5 h-117.5 rounded-full border border-[#E7D6BE]"></div>
              </div>

              {/* Portrait */}

              <div className="relative bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/src/media/hero.jpeg"
                  alt="Pandit Kamla Prasad Bhatt"
                  className="w-107.5 h-107.5 object-cover"
                />
              </div>

              {/* Decorative Star */}

              <div className="absolute -top-6 right-10 text-6xl text-[#D5B58A] opacity-70">
                ✦
              </div>

              {/* Decorative Moon */}

              <div className="absolute -bottom-6 left-6 text-6xl text-[#D5B58A] opacity-40">
                ☾
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOG SECTION */}

      <section className="bg-[#FCF6EC] border-t border-[#ECDCC5]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Heading */}

          <div className="text-center max-w-2xl mx-auto">
            <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
              From the Blog
            </p>

            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-[#2F120F]">
              Latest from the Blog
            </h2>

            <p className="mt-4 text-[#5A4A42] leading-7">
              Insights and guidance on Vedic astrology, spirituality and
              everyday life.
            </p>
          </div>

          {/* Blog States */}

          {blogLoading ? (
            <div className="mt-12 text-center text-gray-500">
              Loading articles...
            </div>
          ) : blogError ? (
            <div className="mt-12 text-center text-red-600">
              {blogError}
            </div>
          ) : blogs.length === 0 ? (
            <div className="mt-12 text-center text-gray-500">
              No articles available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {blogs.slice(0, 3).map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white border border-[#ECDCC5] rounded-3xl p-7 shadow-md"
                >
                  <span className="text-xs uppercase tracking-[2px] text-[#8B1111] font-semibold">
                    Vedic Astrology
                  </span>

                <h3
                  className={`mt-4 text-2xl text-[#2F120F] ${
                    isHindi(blog.title)
                      ? "font-devanagari-serif"
                      : "font-serif"
                  }`}
                >
                  {blog.title}
                </h3>

                <p
                  className={`mt-4 leading-7 line-clamp-3 ${
                    isHindi(blog.content)
                      ? "font-devanagari-sans"
                      : "font-sans"
                  }`}
                >
                  {blog.content}
                </p>

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
          <div className="flex justify-center mt-10">
            <Link
              to="/blogs"
              className="border border-[#8B1111] text-[#8B1111] hover:bg-[#FFF7EE] px-7 py-3 rounded-full transition"
            >
              View All Articles →
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;