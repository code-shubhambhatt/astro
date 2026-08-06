import { useState } from "react";
import { loginAdmin } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(email, password);

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      }
  }

  return (
    <section className="min-h-screen bg-[#F9F1E4] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-[#FCF6EC] border border-[#ECDCC5] rounded-4xl shadow-xl p-10">

          <div className="text-center">

            <div className="w-16 h-16 rounded-full bg-[#8B1111] text-white flex items-center justify-center mx-auto mb-6 text-2xl">
              ✦
            </div>

            <h1 className="font-serif text-4xl text-[#2F120F]">
              Admin Login
            </h1>

            <p className="mt-3 text-gray-600">
              Sign in to access the administration panel.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#D9C8B2] bg-white px-4 py-3 outline-none focus:border-[#8B1111] focus:ring-2 focus:ring-[#8B1111]/20 transition"
              />

            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B1111] hover:bg-[#6D0D0D] disabled:opacity-60 text-white py-3 rounded-full font-medium transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Login;