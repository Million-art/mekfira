import React, { useState } from 'react';
import RentalList from './RentalList'; // Adjust the import path to RentalList if needed
import { Rental } from '../type'; // Assuming you have a Rental type defined

interface UserPageProps {
    users: Rental[];           // Pass the list of renters as a prop
    deleteUser: (userId: string) => void; // Function to handle renter deletion
}

const UserPage: React.FC<UserPageProps> = ({ users, deleteUser }) => {
    const [rentals, setRentals] = useState<Rental[]>(users);

    // Function to extend the contract
    const extendContract = (rentalId: string, newEndDate: string) => {
        setRentals(prevRentals =>
            prevRentals.map(rental =>
                rental.rentalId === rentalId
                    ? { ...rental, rentalEndDate: new Date(newEndDate) }
                    : rental
            )
        );
    };

    if (rentals.length === 0) {
        return <p>No tenant available.</p>;  // Show this if there are no users
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <p className="mb-4">There are <b>{rentals.length}</b> tenants</p>
            {/* Render RentalList component to display the users */}
            <RentalList rentals={rentals} deleteUser={deleteUser} extendContract={extendContract} />
        </div>
    );
};

export default UserPage;
