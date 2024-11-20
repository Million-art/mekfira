import api from '@/api/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<User | null>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    login: async () => null,
    logout: async () => {},
    refreshToken: async () => {} 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Check if the user is authenticated by checking cookies or localStorage
    const checkAuthentication = async () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(savedUser)); // Assuming the user data is saved in localStorage
            setIsLoading(false);
        } else {
            try {
                const response = await api.get('api/admin/auth/check'); // Backend check
                setIsAuthenticated(true);
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    // Function for login
    const login = async (email: string, password: string): Promise<User | null> => {
        try {
            const response = await api.post('api/admin/login', { email, password });
            if (response.data && response.data.data) {
                setIsAuthenticated(true);
                setUser(response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.data)); // Save user data
                setIsLoading(false);
                return response.data.data;
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
        return null;
    };

    const logout = async (): Promise<void> => {
        try {
            await api.post('/api/admin/logout'); // Logout route
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('user'); // Clear user data from localStorage
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const refreshToken = async (): Promise<void> => {
        try {
            const response = await api.get('/auth/refresh-token');
            if (response.data.accessToken) {
                console.log('Access token refreshed');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
