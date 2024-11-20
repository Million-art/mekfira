import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path if necessary

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    useEffect(() => {
        console.log("Is Authenticated:", isAuthenticated); // Log when the state changes
    }, [isAuthenticated]); 

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator until authentication check completes
    }

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
