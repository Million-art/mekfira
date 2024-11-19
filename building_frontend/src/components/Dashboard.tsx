import React, { useState, useEffect } from "react";
import OfficeForm from "./OfficeForm";
import OfficePage from "./OfficePage";
import { DashboardProps, Office, Renter, RentOfficeForm } from "../type"; // Adjust the path based on your project structure
import fetchOffices from "../utils/helpers/fetchOffices";
import MyChart from "./MyChart";

import api from "../api/api";
import UserPage from "./UserPage";
import fetchUsers from "@/utils/helpers/fetchUser";
import RentOffice from "./RentalOffice";

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [users, setUsers] = useState<Renter[]>([]);

  // Fetch offices and users whenever the activeSection changes
  useEffect(() => {
    console.log(activeSection);
    fetchOffices({ setOffices, activeSection });
    fetchUsers({ setUsers, activeSection });
  }, [activeSection]);

  // Add a new office to the list
  const addOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office]);
  };

  // Delete an office by its officeId
  const deleteOffice = async (officeId: string) => {
    try {
      await api.delete(`api/offices/delete/${officeId}`);
      // Remove the office from the state after successful deletion
      setOffices((prevOffices) =>
        prevOffices.filter((office) => office.officeId !== officeId)
      );
    } catch (error) {
      console.error("Error deleting office:", error);
    }
  };

  // Delete a user by their userId
  const deleteRenter = async (userId: string) => {
    try {
      await api.delete(`api/users/delete/${userId}`);
      // Remove the user from the state after successful deletion
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.renterId !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Add a new rental to the list
  const addRent = (rent: RentOfficeForm) => {
    // Here you would typically update the state or do something with the new rental details.
    console.log("New rent added:", rent);
  };

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Render chart if the active section is 'dashboard' */}
      {activeSection === "dashboard" && (
        <div className="h-[100%]">
          <MyChart />
        </div>
      )}

      {/* Render the office form to add an office if the active section is 'addOffice' */}
      {activeSection === "addOffice" && <OfficeForm addOffice={addOffice} />}

      {/* Render the list of offices with delete functionality if the active section is 'manageOffices' */}
      {activeSection === "manageOffices" && (
        <OfficePage offices={offices} deleteOffice={deleteOffice} />
      )}

      {/* Render the rental form if the active section is 'addRental' */}
      {activeSection === "addRental" && (
        <RentOffice addRent={addRent} offices={offices} />
      )}

      {/* Render the list of users with delete functionality if the active section is 'manageUsers' */}
      {activeSection === "manageUsers" && (
        <UserPage users={users} deleteUser={deleteRenter} />
      )}
    </div>
  );
};

export default Dashboard;
