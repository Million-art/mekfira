import { DashboardProps, User } from "../../type"; // Assuming these types exist
import api from "../../api/api";

const fetchUsers = async ({setUsers,activeSection}:{setUsers: (users: User[]) => void, activeSection: DashboardProps['activeSection'] }) => {
    if (activeSection === 'manageUsers') {
        try {
            const response = await api.get(`api/users/all`);
            setUsers(response.data); // Make sure response.data matches the User type
            console.log('resssssss',response)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
};
export default fetchUsers;