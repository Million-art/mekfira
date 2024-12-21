import { useState } from "react";
import api from "@/api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // New state to track email sent status

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email) {
      setError("Email is required.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/api/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(
          "A password reset link has been sent to your email address. Please check your inbox."
        );
        setIsEmailSent(true); // Set the email sent status to true
        setEmail(""); // Clear the email field
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white rounded-md ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {isEmailSent && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">Check your email to reset your password.</p>
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Open Email Client
            </a>
          </div>
        )}

        <div className="mt-4 text-center">
          <small>
            Remembered your password?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
