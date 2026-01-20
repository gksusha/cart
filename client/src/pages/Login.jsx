import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (!data.success) return setError(data.message || "Login failed");
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/");
      window.location.reload();
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-md mx-auto px-6">
        <h1 className="text-3xl font-light tracking-wide text-gray-800 mb-8">
          SIGN IN
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email Address</label>
            <input
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <input
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#343a40] text-white py-3 px-8 text-sm tracking-wide hover:bg-[#23272b] transition-colors cursor-pointer"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          New Customer?{" "}
          <Link to="/signup" className="text-gray-800 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;