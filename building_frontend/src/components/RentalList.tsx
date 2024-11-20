import React, { useState } from 'react';
import { Rental } from '../type';

interface RentalListProps {
    rentals: Rental[];
    deleteUser: (userId: string) => void;
    extendContract: (rentalId: string, newEndDate: string) => void;  // Function to extend the contract
}

const RentalList: React.FC<RentalListProps> = ({ rentals, deleteUser, extendContract }) => {
    const [editingEndDate, setEditingEndDate] = useState<string | null>(null);
    const [newEndDate, setNewEndDate] = useState<string>('');

    const handleEndDateChange = (rentalId: string) => {
        extendContract(rentalId, newEndDate);
        setEditingEndDate(null);
        setNewEndDate('');
    };

    return (
        <div className="space-y-6">
            {rentals.map(rental => {
                // Ensure rentalStartDate is a Date object
                const rentalStartDate = rental.rentalStartDate instanceof Date
                    ? rental.rentalStartDate
                    : new Date(rental.rentalStartDate); // Convert string to Date

                return (
                    <div key={rental.rentalId} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        <p className="font-bold text-xl">{rental.tenantName}</p>
                        <p className="text-gray-600">{rental.phone}</p>
                        <p className="text-sm text-gray-500">Office ID: {rental.rentedOfficeId}</p>
                        {/* Format date only if it's a valid date */}
                        <p className="text-sm text-gray-500">
                            Start Date: {!isNaN(rentalStartDate.getTime()) ? rentalStartDate.toLocaleDateString() : 'Invalid date'}
                        </p>
                        
                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => deleteUser(rental.rentalId)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setEditingEndDate(rental.rentalId)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Extend Contract
                            </button>
                        </div>

                        {/* Display an input field for end date editing */}
                        {editingEndDate === rental.rentalId && (
                            <div className="mt-4">
                                <input
                                    type="date"
                                    value={newEndDate}
                                    onChange={(e) => setNewEndDate(e.target.value)}
                                    className="border p-2 rounded-lg"
                                />
                                <button
                                    onClick={() => handleEndDateChange(rental.rentalId)}
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ml-2"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RentalList;
