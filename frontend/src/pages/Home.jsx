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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* LEFT */}

          <div>
            <span className="inline-flex items-center gap-2 bg-[#FCF6EC] border border-[#ECDCC5] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm text-[#8B1111] font-medium shadow-sm">
              <CheckCircle2 size={16} />
              Trusted Vedic Astrologer
            </span>

            <h1 className="mt-6 sm:mt-8 font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight text-[#2F120F]">
              Pandit
              <br />
              Kamla Prasad
              <br />
              Bhatt
            </h1>

            <p className="mt-4 sm:mt-6 text-xl sm:text-3xl font-serif text-[#7C1111]">
              26+ Years of Vedic Astrology
            </p>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-9 text-[#5A4A42] max-w-xl">
              Guiding individuals and families through authentic Vedic
              astrology, Kundli analysis, Hawan, Vastu consultation and
              personalized spiritual guidance for career, marriage, health,
              finance and life's important decisions.
            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mt-8 sm:mt-10">
              <Link
                to="/contact"
                className="bg-[#8B1111] hover:bg-[#6D0D0D] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition shadow-lg text-base font-medium"
              >
                Book Consultation
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/services"
                className="border border-[#8B1111] text-[#8B1111] hover:bg-[#FFF7EE] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-center transition text-base font-medium"
              >
                Explore Services
              </Link>
            </div>

            {/* Features */}

            <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-5 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#8B1111] shrink-0" />
                <span className="text-[#3A2A24]">
                  Certified Vedic Astrologer
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#8B1111] shrink-0" />
                <span className="text-[#3A2A24]">
                  Personalized Birth Chart Analysis
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#8B1111] shrink-0" />
                <span className="text-[#3A2A24]">
                  Online & Offline Consultations
                </span>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14">
              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-5 sm:p-6 text-center">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#8B1111]">26+</h2>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Years</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-5 sm:p-6 text-center">
                <CalendarDays
                  className="mx-auto text-[#8B1111]"
                  size={26}
                />
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">By Appointment</p>
              </div>

              <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-5 sm:p-6 text-center">
                <Globe className="mx-auto text-[#8B1111]" size={26} />
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">Worldwide</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center py-6 lg:py-0">
            <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-[#F2E4D0] blur-3xl opacity-60"></div>

            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[400px] aspect-square flex items-center justify-center">
              {/* Decorative Circle */}

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[110%] h-[110%] rounded-full border border-[#E7D6BE]"></div>
              </div>

              {/* Portrait */}

              <div className="relative w-full h-full bg-white rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white">
                <img
                  src="/src/media/hero.jpeg"
                  alt="Pandit Kamla Prasad Bhatt"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Star */}

              <div className="absolute -top-4 sm:-top-6 right-2 sm:right-6 text-4xl sm:text-6xl text-[#D5B58A] opacity-70">
                ✦
              </div>

              {/* Decorative Moon */}

              <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:left-4 text-4xl sm:text-6xl text-[#D5B58A] opacity-40">
                ☾
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOG SECTION */}

      <section className="bg-[#FCF6EC] border-t border-[#ECDCC5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          {/* Heading */}

          <div className="text-center max-w-2xl mx-auto">
            <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
              From the Blog
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2F120F]">
              Latest from the Blog
            </h2>

            <p className="mt-4 text-[#5A4A42] leading-7 text-sm sm:text-base">
              Insights and guidance on Vedic astrology, spirituality and
              everyday life.
            </p>
          </div>

          {/* Blog States */}

          {blogLoading ? (
            <div className="mt-10 sm:mt-12 text-center text-gray-500">
              Loading articles...
            </div>
          ) : blogError ? (
            <div className="mt-10 sm:mt-12 text-center text-red-600">
              {blogError}
            </div>
          ) : blogs.length === 0 ? (
            <div className="mt-10 sm:mt-12 text-center text-gray-500">
              No articles available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
              {blogs.slice(0, 3).map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white border border-[#ECDCC5] rounded-3xl p-5 sm:p-7 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[2px] text-[#8B1111] font-semibold">
                      Vedic Astrology
                    </span>

                    <h3
                      className={`mt-3 sm:mt-4 text-xl sm:text-2xl text-[#2F120F] ${
                        isHindi(blog.title)
                          ? "font-devanagari-serif"
                          : "font-serif"
                      }`}
                    >
                      {blog.title}
                    </h3>

                    <p
                      className={`mt-3 sm:mt-4 leading-7 line-clamp-3 text-sm sm:text-base text-gray-700 ${
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
                    className="mt-6 sm:mt-7 text-[#8B1111] font-medium hover:text-[#6D0D0D] flex items-center gap-2 text-sm sm:text-base"
                  >
                    Read Article
                    <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-8 sm:mt-10">
            <Link
              to="/blogs"
              className="border border-[#8B1111] text-[#8B1111] hover:bg-[#FFF7EE] px-6 sm:px-7 py-3 rounded-full transition text-sm sm:text-base font-medium"
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