import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path if necessary
import Loading from './Loading';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    useEffect(() => {
        console.log("Is Authenticated:", isAuthenticated); 
    }, [isAuthenticated]); 

    if (isLoading) {
        return  <Loading />
    }

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
