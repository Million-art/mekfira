import { DashboardProps, Office } from "../../type"; // Assuming these types exist
import api from "../../api/api";

// Adjusted parameter types for setOffices and activeSection
const fetchOffices = async ({ setOffices, activeSection }: { setOffices: (offices: Office[]) => void, activeSection: DashboardProps['activeSection'] }) => {
    if (activeSection === 'manageOffices'||activeSection === 'addRental') {
        try {
            const response = await api.get(`api/offices/all`);
             const offices: Office[] = response.data; // Assuming response.data is of type Office[]
            setOffices(offices); // Update the state with fetched offices
            
        } catch (error) {
            console.error('Error fetching offices:', error);
        }
    }
};

export default fetchOffices;
