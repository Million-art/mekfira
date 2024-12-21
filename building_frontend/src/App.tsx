import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import SideBar from './components/SideBar';
import Login from './screens/Login';
import { ActiveSection } from './type'; // Adjust the import path to where your types are defined
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './components/AuthContext';
import NotFound from './screens/404';
import ResetPassword from './screens/ResetPassword';
import ForgotPassword from './screens/ForgotPassword';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const { logout } = useAuth(); 

  const handleLogout = async () => {
    await logout(); // Call the logout function
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Extract token from the URL query string

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Routes>
        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />
        <Route 
          path="/reset-password"
          element={token ? <ResetPassword token={token} /> : <NotFound />} // Pass token as a prop
        />
        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SideBar setActiveSection={setActiveSection} onLogout={handleLogout} />
              <Dashboard activeSection={activeSection} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
