import React from "react";
import OfficeForm from "../components/OfficeForm";
import OfficePage from "../components/OfficePage";
import { DashboardProps } from "../type";
// import MyChart from "./MyChart";
import UserPage from "../components/RenterPage";
import RentOffice from "../components/RentalOffice";
import Analytics from "../components/Analytics";

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Render chart if the active section is 'dashboard' */}
      {activeSection === "dashboard" && (
        <div className="h-[100%]  md:flex">
          {/* <MyChart /> */}
          <Analytics />
        </div>
      )}

      {/* Render the office form to add an office if the active section is 'addOffice' */}
      {activeSection === "addOffice" && <OfficeForm activeSection={activeSection} />}

      {/* Render the list of offices with delete functionality if the active section is 'manageOffices' */}
      {activeSection === "manageOffices" && (
        <OfficePage activeSection={activeSection}  />
      )}

      {/* Render the rental form if the active section is 'addRental' */}
      {activeSection === "addRental" && (
        <RentOffice activeSection = {activeSection} />
      )}

      {/* Render the list of users with delete functionality if the active section is 'manageUsers' */}
      {activeSection === "manageUsers" && (
        <UserPage activeSection = {activeSection}/>
      )}
    </div>
  );
};

export default Dashboard;
