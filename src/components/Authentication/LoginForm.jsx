import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/Notification";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      showNotification({ message: "Login Successful", type: "success" });
      navigate("/dashboard");
    } else {
      showNotification({ message: "Invalid Credentials", type: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-800"> {/* Set the width to 100% */}
      <form onSubmit={handleSubmit} className="bg-green-300 p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
