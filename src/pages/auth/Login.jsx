import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Mail, Lock } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json"; // Import your Lottie animation

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const validatedData = loginSchema.parse(formData);
      console.log("Valid login data:", validatedData);

      // Backend API call
      const response = await fetch(
        "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Login response:", data);

      // Assuming you have a token or user data in the response
      // You can store it in local storage or use a state management library
      // For simplicity, let's assume you have a token
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0];
          acc[path] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        console.error("Error logging in:", error);
        alert("Failed to login. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Lottie Animation */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
          <div className="w-full max-w-xs">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Welcome Back!</h3>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
