import { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "../api/bookings";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllBookings()
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(bookingId, newStatus) {
    try {
      await updateBookingStatus(bookingId, newStatus);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  const pending = bookings.filter((b) => b.status === "new").length;
  const completed = bookings.filter(
    (b) => b.status === "completed"
  ).length;

  return (
    <section className="min-h-screen bg-[#F9F1E4]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-[#8B1111]">
            Admin Panel
          </p>

          <h1 className="font-serif text-5xl text-[#2F120F] mt-3">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-3">
            Welcome back. Here's a quick overview of your website.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Total Bookings
            </p>

            <p className="font-serif text-5xl text-[#8B1111] mt-3">
              {bookings.length}
            </p>
          </div>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Pending
            </p>

            <p className="font-serif text-5xl text-yellow-600 mt-3">
              {pending}
            </p>
          </div>

          <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Completed
            </p>

            <p className="font-serif text-5xl text-green-600 mt-3">
              {completed}
            </p>
          </div>

        </div>

        {/* Bookings */}
        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-3xl shadow-md overflow-hidden">

          {/* Section Header */}
          <div className="px-7 py-6 border-b border-[#ECDCC5] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#2F120F]">
                Bookings
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Recent consultation requests
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {bookings.length} total
            </span>
          </div>

          {/* Booking List */}
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">
                No bookings available.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#ECDCC5]">

              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="px-7 py-6 hover:bg-[#FFF9F0] transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Booking Information */}
                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-serif text-2xl text-[#2F120F]">
                          {booking.name}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>

                      </div>

                      <p className="text-[#8B1111] font-medium mt-1">
                        {booking.service_interested}
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-gray-500">
                        <span>
                          📞 {booking.phone}
                        </span>

                        <span>
                          🗓️{" "}
                          {booking.preferred_datetime?.$date
                            ? new Date(booking.preferred_datetime.$date).toLocaleString()
                            : booking.preferred_datetime}
                        </span>

                        {booking.email && (
                          <span>
                            ✉️ {booking.email}
                          </span>
                        )}
                      </div>

                      {booking.message && (
                        <p className="mt-4 max-w-3xl bg-white/70 border border-[#ECDCC5] rounded-xl px-4 py-3 text-sm text-gray-700 italic">
                          "{booking.message}"
                        </p>
                      )}

                      <p className="text-xs text-gray-400 mt-3">
                        Requested{" "}
                        {booking.created_at?.$date
                          ? new Date(booking.created_at.$date).toLocaleDateString()
                          : booking.created_at
                            ? new Date(booking.created_at).toLocaleDateString()
                            : ""}
                      </p>

                    </div>

                    {/* Action */}
                    {booking.status !== "completed" && (
                      <div className="shrink-0">

                        <button
                          onClick={() =>
                            handleStatusChange(
                              booking._id,
                              "completed"
                            )
                          }
                          className="border border-[#8B1111] text-[#8B1111] hover:bg-[#8B1111] hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                        >
                          Mark Completed
                        </button>

                      </div>
                    )}

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

export default Dashboard;