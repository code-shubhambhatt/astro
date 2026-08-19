import { useState, useEffect } from "react";
import { createBooking } from "../api/bookings";
import { getAbout } from "../api/about";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_interested: "",
    preferred_datetime: "",
    message: "",

  });

  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [contactInfo, setContactInfo] = useState({});


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      await createBooking(formData);

      setStatus("success");

      setFormData({
        name: "",
        phone: "",
        email: "",
        service_interested: "",
        preferred_datetime: "",
        message: "",
      });

      setErrorMsg("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }
  useEffect(() => {
    getAbout().then((data) => setContactInfo(data)).catch(() => { });
  }, []);

  return (
    <div className="flex-1 bg-[#F9F1E4] min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)] py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Booking Form */}
        <div className="lg:col-span-2 bg-[#FCF6EC] rounded-3xl sm:rounded-4xl shadow-lg border border-[#F0E4D1] p-6 sm:p-10">

          <h1 className="text-2xl sm:text-4xl font-serif text-[#2F120F] mb-2">
            Book a Consultation
          </h1>

          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Fill in your details and we'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

            {/* Name */}

            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none text-sm sm:text-base bg-white"
              />
            </div>

            {/* Email + Phone */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              <div>
                <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none text-sm sm:text-base bg-white"
                />
              </div>

              <div>
                <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none text-sm sm:text-base bg-white"
                />
              </div>

            </div>

            {/* Service */}

            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                Service Interested In
              </label>

              <select
                name="service_interested"
                value={formData.service_interested}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none text-sm sm:text-base bg-white"
              >
                <option value="">Select a Service</option>
                <option value="Kundli Reading">Kundli Reading</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Marriage Consultation">
                  Marriage Consultation
                </option>
                <option value="Vastu Consultation">
                  Vastu Consultation
                </option>
                <option value="Hawan">Hawan</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date */}

            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                Preferred Date
              </label>

              <input
                type="date"
                name="preferred_datetime"
                required
                value={formData.preferred_datetime}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none text-sm sm:text-base bg-white"
              />
            </div>

            {/* Message */}

            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                Message (Optional)
              </label>

              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us anything you'd like us to know..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#7C1111] outline-none resize-none text-sm sm:text-base bg-white"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-[#7C1111] hover:bg-[#651010] transition text-white font-medium px-8 py-3.5 rounded-full shadow-md text-sm sm:text-base"
            >
              {status === "loading"
                ? "Submitting..."
                : "Request Consultation"}
            </button>

            {/* Messages */}

            {status === "success" && (
              <div className="rounded-xl bg-green-100 border border-green-300 text-green-700 p-4 text-sm sm:text-base">
                Your booking request has been submitted successfully.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-red-100 border border-red-300 text-red-700 p-4 text-sm sm:text-base">
                {errorMsg}
              </div>
            )}

          </form>
        </div>

        {/* Contact Card */}

        <div className="bg-[#FCF6EC] rounded-3xl sm:rounded-4xl border border-[#ECDCC5] shadow-md p-6 sm:p-8">

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <p className="uppercase tracking-[3px] text-xs font-semibold text-[#8B1111]">
              Get In Touch
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#2F120F] mt-2">
              Contact Information
            </h2>

            <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
              Have a question or want to book a consultation?
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-5 sm:space-y-6">

            {/* Phone */}
            {contactInfo.phone && (
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Phone
                </p>

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-base sm:text-lg text-[#2F120F] hover:text-[#8B1111] transition break-words"
                >
                  {contactInfo.phone}
                </a>
              </div>
            )}

            {/* Email */}
            {contactInfo.email && (
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Email
                </p>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-base sm:text-lg text-[#2F120F] hover:text-[#8B1111] break-all transition"
                >
                  {contactInfo.email}
                </a>
              </div>
            )}

            {/* Address */}
            {contactInfo.address && (
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Visit Us
                </p>

                <p className="text-base sm:text-lg leading-relaxed text-[#2F120F] break-words">
                  {contactInfo.address}
                </p>
              </div>
            )}

          </div>

          {/* Divider */}
          {contactInfo.facebook && (
            <>
              <div className="border-t border-[#ECDCC5] my-6" />

              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Connect
                  </p>

                  <p className="text-[#2F120F] font-medium group-hover:text-[#8B1111] transition text-sm sm:text-base">
                    Facebook Profile
                  </p>
                </div>

                <span className="text-[#8B1111] text-xl group-hover:translate-x-1 transition">
                  →
                </span>
              </a>
            </>
          )}

          {/* Directions */}
          {contactInfo.directions && (
            <div className="mt-6 pt-6 border-t border-[#ECDCC5]">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Find Us
              </p>

              <h3 className="font-serif text-xl sm:text-2xl text-[#2F120F] mb-3">
                Our Location
              </h3>

              <div className="rounded-2xl overflow-hidden border border-[#ECDCC5]">
                <iframe
                  src={contactInfo.directions}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JyotishHorizon Location"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Contact;