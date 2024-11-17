import React from 'react';
import UserList from './UserList'; // Adjust the import path if necessary
import { User } from '../type'; // Assuming you have a User type defined

interface UserPageProps {
    users: User[];           // Pass the list of users as a prop
    deleteUser: (userId: string) => void; // Function to handle user deletion
}

const UserPage: React.FC<UserPageProps> = ({ users, deleteUser }) => {
    if (users.length === 0) {
        return <p>No users available.</p>;
    }
console.log('aaaaaaaa',users)
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <p className="mb-4">There are <b className='3xl'>{users.length}</b> users</p>
            <UserList users={users} deleteUser={deleteUser} />
        </div>
    );
};

export default UserPage;
