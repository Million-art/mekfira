import React, { useState, useEffect } from 'react';
import RentalList from './RentalList'; // Adjust the import path to RentalList if needed
import { ActiveSection, Rental } from '../type'; // Assuming you have a Rental type defined
import fetchUsers from '@/utils/helpers/fetchUser'; // Your fetch function for users
import api from '@/api/api';

interface UserPageProps {
    activeSection: ActiveSection;
}

const RenterPage: React.FC<UserPageProps> = ({ activeSection }) => {
    const [rentals, setRentals] = useState<Rental[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch offices and users whenever the activeSection changes
    useEffect(() => {
        setLoading(true); // Start loading when fetching new data
        fetchUsers({ setRentals, activeSection }).finally(() => {
            setLoading(false); // Stop loading once the data is fetched
        });
    }, [activeSection]);

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

    // Delete a renter by their userId
    const deleteRenter = async (rentalId: string) => {
        try {
            await api.delete(`api/users/delete/${rentalId}`);
            // Remove the user from the state after successful deletion
            setRentals((prevRentals) =>
                prevRentals.filter((renter) => renter.rentalId !== rentalId)
            );
        } catch (error) {
            console.error("Error deleting renter:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div> {/* Add custom loader here */}
            </div>
        );
    }

    if (rentals.length === 0) {
        return <p>No tenants available.</p>; // Show this if there are no users
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-6">Tenants Management</h1>
            <p className="mb-4">There are <b>{rentals.length}</b> tenants</p>
            {/* Render RentalList component to display the users */}
            <RentalList rentals={rentals} deleteRenter={deleteRenter} extendContract={extendContract} />
        </div>
    );
};

export default RenterPage;
