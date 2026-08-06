import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBookings } from "../api/bookings";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F1E4] flex items-center justify-center">
        <p className="text-lg text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const recentBookings = bookings.slice(0, 5);

  return (
    <section className="min-h-screen bg-[#F9F1E4] p-8">

      <div className="max-w-7xl mx-auto">

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-7">

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Total Bookings
            </p>

            <h2 className="font-serif text-5xl text-[#8B1111] mt-4">
              {bookings.length}
            </h2>

          </div>

          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-7">

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Pending
            </p>

            <h2 className="font-serif text-5xl text-yellow-600 mt-4">
              {pending}
            </h2>

          </div>

          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-7">

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Completed
            </p>

            <h2 className="font-serif text-5xl text-green-600 mt-4">
              {completed}
            </h2>

          </div>

          <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-7">

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Today's Requests
            </p>

            <h2 className="font-serif text-5xl text-[#2F120F] mt-4">
              0
            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Recent Bookings */}

          <div className="lg:col-span-2 bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md">

            <div className="flex items-center justify-between p-6 border-b border-[#ECDCC5]">

              <h2 className="font-serif text-3xl text-[#2F120F]">
                Recent Bookings
              </h2>

              <Link
                to="/admin/bookings"
                className="text-[#8B1111] font-medium hover:underline"
              >
                View All →
              </Link>

            </div>

            <div className="divide-y divide-[#ECDCC5]">

              {recentBookings.length === 0 ? (

                <div className="p-8 text-center text-gray-500">
                  No bookings available.
                </div>

              ) : (

                recentBookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="p-6 hover:bg-[#FFF8EF] transition"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="font-semibold text-lg text-[#2F120F]">
                          {booking.name}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          {booking.service_interested}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          📞 {booking.phone}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>
                    {/* Right Side */}

          <div className="space-y-8">

            {/* Quick Actions */}

            <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6">

              <h2 className="font-serif text-3xl text-[#2F120F] mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <Link
                  to="/admin/bookings"
                  className="block bg-[#8B1111] hover:bg-[#6D0D0D] text-white text-center py-3 rounded-2xl transition font-medium"
                >
                  Manage Bookings
                </Link>

                <Link
                  to="/admin/services"
                  className="block bg-white hover:bg-[#FFF8EF] border border-[#ECDCC5] text-[#2F120F] text-center py-3 rounded-2xl transition font-medium"
                >
                  Manage Services
                </Link>

                <Link
                  to="/admin/testimonials"
                  className="block bg-white hover:bg-[#FFF8EF] border border-[#ECDCC5] text-[#2F120F] text-center py-3 rounded-2xl transition font-medium"
                >
                  Manage Testimonials
                </Link>

                <Link
                  to="/admin/about"
                  className="block bg-white hover:bg-[#FFF8EF] border border-[#ECDCC5] text-[#2F120F] text-center py-3 rounded-2xl transition font-medium"
                >
                  Update About Page
                </Link>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="bg-[#FCF6EC] rounded-3xl border border-[#ECDCC5] shadow-md p-6">

              <h2 className="font-serif text-3xl text-[#2F120F] mb-6">
                Recent Activity
              </h2>

              {recentBookings.length === 0 ? (

                <p className="text-gray-500">
                  No recent activity.
                </p>

              ) : (

                <div className="space-y-5">

                  {recentBookings.slice(0, 3).map((booking) => (

                    <div
                      key={booking._id}
                      className="border-l-4 border-[#8B1111] pl-4"
                    >

                      <p className="font-medium text-[#2F120F]">
                        {booking.name}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        Requested{" "}
                        <span className="font-medium">
                          {booking.service_interested}
                        </span>
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Status: {booking.status}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;