import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Login = () => {
    const { login, isAuthenticated } = useAuth();  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if the user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);  

        try {
            const user = await login(email, password);  
            if (user) {  
                setErrorMessage("");
                navigate("/");
                console.log(user);
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                    <button
                        type="submit"
                        className={`w-full p-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {loading && (
                    <div className="flex justify-center mt-3">
                        <div className="loader border-t-4 border-blue-600 rounded-full w-6 h-6 animate-spin"></div>
                    </div>
                )}
                <small className="mt-5 flex justify-center">Forgot Password?
                     <a href="/forgot-password" className="text-blue-700 ml-1">
                      Reset Password
                      </a>
                </small>
            </div>
        </div>
    );
};

export default Login;
