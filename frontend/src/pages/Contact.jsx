import { useState } from "react";
import { createBooking } from "../api/bookings";

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
                type="text"
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

        <div className="space-y-6">

          <div className="bg-white rounded-3xl shadow-lg border border-[#F0E4D1] p-8">

            <h2 className="text-2xl font-serif text-[#7C1111] mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">

              <div>
                <p className="font-semibold text-gray-800">
                  Phone
                </p>

                <p className="text-gray-600">
                  +91 XXXXX XXXXX
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Email
                </p>

                <p className="text-gray-600 break-all">
                  your@email.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Address
                </p>

                <p className="text-gray-600">
                  Haridwar, Uttarakhand
                </p>
              </div>

            </div>

          </div>

          {/* <div className="bg-white rounded-3xl shadow-lg border border-[#F0E4D1] p-8">

            <h2 className="text-2xl font-serif text-[#7C1111] mb-4">
              Consultation Hours
            </h2>

            <div className="space-y-2 text-gray-600">

              <p>Monday – Saturday</p>

              <p>10:00 AM – 6:00 PM</p>

              <p className="pt-4 text-sm">
                We usually respond within 24 hours after receiving your
                consultation request.
              </p>

            </div>

          </div> */}

        </div>

      </div>
    </div>
  );
}

export default Contact;