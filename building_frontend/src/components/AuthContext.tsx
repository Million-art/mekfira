// src/AuthContext.tsx
import api from '@/api/api';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User interface with relevant fields
interface User {
    id: string;
    email: string;
    // Add other user fields if needed
}

// Define the AuthContextType interface to outline the context shape
interface AuthContextType {
    isAuthenticated: boolean; // Indicates if the user is logged in
    isLoading: boolean;       // Indicates if the authentication status is loading
    user: User | null;       // User information if authenticated
    login: (email: string, password: string) => Promise<User | null>; // Function for logging in
    logout: () => Promise<void>; // Function for logging out
}

// Create a context with a default value
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true, // Default loading state to true
    user: null,
    login: async () => null, // Provide a default function
    logout: async () => { }, // Provide a default function
});

// Hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
    const [user, setUser] = useState<User | null>(null);

    // Function to log in the user
    const login = async (email: string, password: string): Promise<User | null> => {
        setIsLoading(true); // Set loading to true while processing
        try {
            const response = await api.post(
                'api/admin/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                console.log('this', response)
                const loggedInUser: User = {
                    id: response.data.id,
                    email: response.data.email,
                };
                setUser(loggedInUser);
                setIsAuthenticated(true); // Set authenticated state
                console.log("Is Authenticated:", true); // Log after state is set
                return loggedInUser; // Return user object on success
            }
            
        } catch (error) {
            console.error("Login failed", error);
            return null; // Return null on failure
        } finally {
            setIsLoading(false); // Loading complete
        }
        return null; // Default return if the function reaches here
    };

    // Function to log out the user
    const logout = async () => {
        setIsLoading(true); // Set loading to true while processing
        try {
            await api.post('api/admin/logout', {}, { withCredentials: true });
            setUser(null);
            setIsAuthenticated(false);
            console.log("Is Authenticated:", false); // Log on logout
        } catch (error) {
            console.error("Logout failed", error);
            // Handle errors (e.g., notify the user)
        } finally {
            setIsLoading(false); // Loading complete
        }
    };

    // Check authentication status on initial load
    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsLoading(true); // Set loading state
            try {
                const response = await api.get('api/admin/auth-status', {
                    withCredentials: true,
                });
                console.log('Authentication response:', response); // Add logging here
                if (response.status === 200 && response.data.user) {
                    const loggedInUser: User = {
                        id: response.data.user.id,
                        email: response.data.user.email,
                    };
                    setUser(loggedInUser);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
                console.error("Authentication status check failed", error);
                // Handle errors (e.g., notify the user)
            } finally {
                setIsLoading(false); // Loading complete
            }
        };
        

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
