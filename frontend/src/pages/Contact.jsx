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
    <div className="bg-[#F9F1E4] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Booking Form */}
        <div className="lg:col-span-2 bg-[#FCF6EC] rounded-3xl shadow-lg border border-[#F0E4D1] p-10">

          <h1 className="text-4xl font-serif text-[#2F120F] mb-2">
            Book a Consultation
          </h1>

          <p className="text-gray-600 mb-8">
            Fill in your details and we'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none"
              />
            </div>

            {/* Email + Phone */}

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none"
                />
              </div>

            </div>

            {/* Service */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Service Interested In
              </label>

              <select
                name="service_interested"
                value={formData.service_interested}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none"
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
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Preferred Date & Time
              </label>

              <input
                type="date"
                name="preferred_datetime"
                required
                value={formData.preferred_datetime}
                onChange={handleChange}
                placeholder="Example: 12 Aug 2026, 4:00 PM"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none"
              />
            </div>

            {/* Message */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us anything you'd like us to know..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7C1111] outline-none resize-none"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#7C1111] hover:bg-[#651010] transition text-white font-medium px-8 py-3 rounded-full shadow-md"
            >
              {status === "loading"
                ? "Submitting..."
                : "Request Consultation"}
            </button>

            {/* Messages */}

            {status === "success" && (
              <div className="rounded-xl bg-green-100 border border-green-300 text-green-700 p-4">
                Your booking request has been submitted successfully.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-red-100 border border-red-300 text-red-700 p-4">
                {errorMsg}
              </div>
            )}

          </form>
        </div>

        {/* Contact Card */}

        <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-8">

          {/* Header */}
          <div className="mb-8">
            <p className="uppercase tracking-[3px] text-xs font-semibold text-[#8B1111]">
              Get In Touch
            </p>

            <h2 className="font-serif text-3xl text-[#2F120F] mt-2">
              Contact Information
            </h2>

            <p className="text-gray-600 mt-2 leading-relaxed">
              Have a question or want to book a consultation?
            </p>
          </div>


          {/* Contact Details */}
          <div className="space-y-6">

            {/* Phone */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Phone
              </p>

              <a
                href={`tel:${contactInfo.phone}`}
                className="text-lg text-[#2F120F] hover:text-[#8B1111] transition"
              >
                {contactInfo.phone}
              </a>
            </div>


            {/* Email */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Email
              </p>

              <a
                href={`mailto:${contactInfo.email}`}
                className="text-lg text-[#2F120F] hover:text-[#8B1111] break-all transition"
              >
                {contactInfo.email}
              </a>
            </div>


            {/* Address */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Visit Us
              </p>

              <p className="text-lg leading-relaxed text-[#2F120F]">
                {contactInfo.address}
              </p>
            </div>

          </div>


          {/* Divider */}
          <div className="border-t border-[#ECDCC5] my-7" />


          {/* Facebook */}
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

              <p className="text-[#2F120F] font-medium group-hover:text-[#8B1111] transition">
                Facebook Profile
              </p>
            </div>

            <span className="text-[#8B1111] text-xl group-hover:translate-x-1 transition">
              →
            </span>
          </a>


          {/* Directions */}
          <a
            href={contactInfo.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between bg-[#8B1111] hover:bg-[#6D0D0D] text-white rounded-2xl px-5 py-4 transition"
          >
            <div>
              <p className="font-medium">
                Get Directions
              </p>

              <p className="text-sm text-white/70 mt-1">
                Find us in Haridwar
              </p>
            </div>

            <span className="text-xl">
              →
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}

export default Contact;