import React, { useState, useEffect } from 'react';
import { User } from '../type'; // Adjust the path based on your project structure

interface UserListProps {
    users: User[]; // Array of User objects
    deleteUser: (userId: string) => void; // Function to delete a user
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser }) => {
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Initialize as an empty array

    // Effect to filter users whenever the search query or users change
    useEffect(() => {
        if (Array.isArray(users)) {
            const filtered = users.filter(user =>
                user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]); // Run this effect when searchQuery or users changes

    // Function to handle delete confirmation
    const handleDelete = (userId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            deleteUser(userId); // Call the delete function from props
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
            </div>
            
            {!filteredUsers.length ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    First Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Balance
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.firstName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.balance}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
