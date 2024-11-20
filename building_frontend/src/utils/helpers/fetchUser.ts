import { DashboardProps, Renter } from "../../type"; // Assuming these types exist
import api from "../../api/api";

const fetchUsers = async ({setUsers,activeSection}:{setUsers: (users: Renter[]) => void, activeSection: DashboardProps['activeSection'] }) => {
    if (activeSection === 'manageUsers') {
        try {
            const response = await api.get(`api/rentals/all`);
            setUsers(response.data); // Make sure response.data matches the User type
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
};
export default fetchUsers;