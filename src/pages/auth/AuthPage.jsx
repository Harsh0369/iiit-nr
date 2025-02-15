import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { BarChart3, Lock, Mail, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { name, ...loginData } = formData;
        const validatedData = loginSchema.parse(loginData);
        console.log("Valid login data:", validatedData);
        // TODO: Submit to backend
        navigate("/dashboard");
      } else {
        const validatedData = signupSchema.parse(formData);
        console.log("Valid signup data:", validatedData);
        // TODO: Submit to backend
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0];
          acc[path] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Side - Branding */}
        <div className="p-8 md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BarChart3 size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sentiment Analyzer</h2>
            <p className="mb-8 opacity-80">
              Unlock powerful insights from your social media data with advanced
              sentiment analysis
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 opacity-80">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Real-time Analysis</h3>
                  <p className="text-sm">
                    Get instant insights from your social media data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="p-8 md:w-1/2">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h3>
            <p className="text-gray-600 mt-2">
              {isLogin
                ? "Please sign in to continue"
                : "Get started with your free account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline ml-1"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
