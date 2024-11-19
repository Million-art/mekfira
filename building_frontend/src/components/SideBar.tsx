// src/components/SideBar.tsx
import React, { useState } from 'react';
import { ActiveSection } from '../type'; // Adjust the import path as necessary
import { FaHome, FaPlus, FaClipboardList, FaUsers, FaDollarSign, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Font Awesome icons

interface SideBarProps {
  setActiveSection: (section: ActiveSection) => void; // Function to change the active section
  onLogout: () => void; // Function to handle logout
}

const SideBar: React.FC<SideBarProps> = ({ setActiveSection, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage drawer visibility

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle the drawer open/close
  };

  const handleMenuItemClick = (section: ActiveSection) => {
    setActiveSection(section); // Set the active section
    setIsOpen(false); // Close the drawer after selecting a menu item
  };

  return (
    <>
      {/* Toggle Button for Mobile View */}
      <button 
        className="md:hidden p-2 bg-dark-blue text-white z-50 absolute top-5 right-2" 
        onClick={toggleDrawer}
        aria-label="Toggle Menu"
      >
        <FaBars className="h-6 w-6" />
      </button>
      
      {/* Sidebar Drawer */}
      <div className={`bg-dark-blue text-white w-full md:w-64 p-6 z-40 flex flex-col md:static fixed top-0 left-0 h-full transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-8 text-center ">Mekfira commercial center </h2>
        <ul className="flex-grow space-y-4">
          <li
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors duration-200"
            onClick={() => handleMenuItemClick('dashboard')}
            role="button"
            aria-label="Go to Dashboard"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick('dashboard')}
          >
            <FaHome className="h-6 w-6 mr-3" aria-hidden="true" />
            <span className="text-lg">Dashboard</span>
          </li>
          <li
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors duration-200"
            onClick={() => handleMenuItemClick('addOffice')}
            role="button"
            aria-label="Add a Task"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick('addOffice')}
          >
            <FaPlus className="h-6 w-6 mr-3" aria-hidden="true" />
            <span className="text-lg">Add Office</span>
          </li>
          <li
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors duration-200"
            onClick={() => handleMenuItemClick('manageOffices')}
            role="button"
            aria-label="Manage Tasks"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick('manageOffices')}
          >
            <FaClipboardList className="h-6 w-6 mr-3" aria-hidden="true" />
            <span className="text-lg">Manage Office</span>
          </li>
          <li
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors duration-200"
            onClick={() => handleMenuItemClick('manageUsers')}
            role="button"
            aria-label="Manage Users"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick('manageUsers')}
          >
            <FaUsers className="h-6 w-6 mr-3" aria-hidden="true" />
            <span className="text-lg">Manage Rents</span>
          </li>
          <li
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors duration-200"
            onClick={() => handleMenuItemClick('withdrawals')}
            role="button"
            aria-label="Withdrawals"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick('withdrawals')}
          >
            <FaDollarSign className="h-6 w-6 mr-3" aria-hidden="true" />
            <span className="text-lg">Withdrawals</span>
          </li>
        </ul>
        <footer className="mt-auto">
          <button
            className="flex items-center mt-4 text-red-500 hover:text-red-400 transition-colors duration-200 text-lg"
            onClick={onLogout}
            aria-label="Log Out"
          >
            <FaSignOutAlt className="h-5 w-5 mr-2" aria-hidden="true" />
            Log Out
          </button>
        </footer>
      </div>
    </>
  );
}

export default SideBar;