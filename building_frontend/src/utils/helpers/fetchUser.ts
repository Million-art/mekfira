import { DashboardProps, Rental } from "../../type"; // Assuming these types exist
import api from "../../api/api";

const fetchUsers = async ({setRentals,activeSection}:{setRentals: (users: Rental[]) => void, activeSection: DashboardProps['activeSection'] }) => {

    if (activeSection === 'manageUsers') {
        try {
            const response = await api.get(`api/rentals/all`);
            console.log('users',response.data)

            setRentals(response.data); // Make sure response.data matches the User type
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
};
export default fetchUsers;