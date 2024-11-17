// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';
import Login from './components/Login';
import { ActiveSection } from './type'; // Adjust the import path to where your types are defined
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './components/AuthContext';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const { logout } = useAuth(); // Destructure the logout function from context

  const handleLogout = async () => {
    await logout(); // Call the logout function
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Routes>
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
