import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // client validation
      if (!name || !email || !password) {
        setError("All fields are required");
        return;
      }
      const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRe.test(email)) {
        setError("Invalid email");
        return;
      }
      // first register the user
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // registration succeeded – send user to login page
      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration request failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-pink-600">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;