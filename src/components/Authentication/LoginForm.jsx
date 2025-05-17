import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/Notification";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password, role);
      if (success) {
        showNotification({ message: "Login Successful", type: "success" });
        navigate("/");
      } else {
        showNotification({ message: "Invalid Credentials", type: "error" });
      }
    } catch (error) {
      showNotification({ message: "Login Failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <div className="flex gap-4">
              {["Admin", "Inspector", "Engineer"].map((r) => (
                <label key={r} className="flex items-center gap-1 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-green-600"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Accounts:</p>
          <p className="text-gray-500">Admin: admin@entnt.in / admin123</p>
          <p className="text-gray-500">Inspector: inspector@entnt.in / inspect123</p>
          <p className="text-gray-500">Engineer: engineer@entnt.in / engine123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
