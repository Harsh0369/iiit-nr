import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { User, Mail, Lock, Phone } from "lucide-react"; // Added Phone icon
import Lottie from "lottie-react";
import signupAnimation from "../../assets/login.json"; // Import your Lottie animation

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"), // Added phoneNumber validation
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup({ setIsLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "", // Added phoneNumber field
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData);
      console.log("Valid signup data:", validatedData);

      // Set loading state
      setLoading(true);
      setErrorMessage("");

      // Call the backend API
      const response = await fetch(
        "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber, // Added phoneNumber
            password: formData.password,
          }),
        }
      );

      // Handle response
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      console.log("Signup successful:", data);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0];
          acc[path] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        // Handle API errors
        setErrorMessage(error.message || "An error occurred during signup.");
      }
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setErrorMessage(""); // Clear error message on input change
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Lottie Animation */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
          <div className="w-full max-w-xs">
            <Lottie animationData={signupAnimation} loop={true} />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Create Account</h3>
            <p className="text-gray-600 mt-2">
              Get started with your free account
            </p>
          </div>

          {/* Display error message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

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
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" /> {/* Added Phone icon */}
                <Input
                  name="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}