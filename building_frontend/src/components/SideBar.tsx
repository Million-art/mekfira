import React, { useState, useEffect } from 'react';
import OfficeForm from './OfficeForm';
import OfficePage from './OfficePage';
import { DashboardProps, Office } from '../type'; // Adjust the path based on your project structure
import fetchOffices from '../utils/helpers/fetchOffices';
import MyChart from './MyChart';

import api from '../api/api';

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {
    const [offices, setOffices] = useState<Office[]>([]);

    // Fetch offices whenever the activeSection changes
    useEffect(() => {
        fetchOffices({ setOffices, activeSection });
    }, [activeSection]);

    // Add a new office to the list
    const addOffice = (office: Office) => {
        setOffices(prevOffices => [...prevOffices, office]);
    };

    // Delete an office by its officeId
    const deleteOffice = async (officeId: string) => {
        try {
            await api.delete(`api/offices/delete/${officeId}`);
            // Remove the office from the state after successful deletion
            setOffices(prevOffices => prevOffices.filter(office => office.officeId !== officeId));
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    };

    return (
        <div className="p-6 flex-1 overflow-y-auto">
            {/* Render chart if the active section is 'dashboard' */}
            {activeSection === 'dashboard' && <div className='h-[100%]'><MyChart /></div>}

            {/* Render the office form to add an office if the active section is 'addOffice' */}
            {activeSection === 'addOffice' && <OfficeForm addOffice={addOffice} />}

            {/* Render the list of offices with delete functionality if the active section is 'manageOffices' */}
            {activeSection === 'manageOffices' && <OfficePage offices={offices} deleteOffice={deleteOffice} />}
        </div>
    );
};

export default Dashboard;
