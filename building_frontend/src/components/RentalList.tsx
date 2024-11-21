import React, { useState } from 'react';
import { Rental } from '../type';

interface RentalListProps {
    rentals: Rental[];
    deleteRenter: (userId: string) => void;
    extendContract: (rentalId: string, newEndDate: string) => void;
}

const RentalList: React.FC<RentalListProps> = ({ rentals, deleteRenter, extendContract }) => {
 
    const [editingEndDate, setEditingEndDate] = useState<string | null>(null);
    const [newEndDate, setNewEndDate] = useState<string>('');

    const handleEndDateChange = (rentalId: string) => {
        if (newEndDate) {
            extendContract(rentalId, newEndDate);
            setEditingEndDate(null);
            setNewEndDate('');
        }
    };

    return (
        <div className="space-y-6">
            {rentals.map((rental) => {
                // Handle potential undefined values for dates
                const rentalStartDate = rental.rentalStartDate ? new Date(rental.rentalStartDate) : null;
                const rentalEndDate = rental.rentalEndDate ? new Date(rental.rentalEndDate) : null;

                return (
                    <div
                        key={rental.rentalId}
                        className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <p className="font-bold text-xl">{rental.tenantName}</p>
                        <p className="text-gray-600">Phone: {rental.phone}</p>
                        <p className="text-sm text-gray-500">
                            Office No: {rental?.office?.officeNo || 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Floor No: {rental?.office?.floorNo || 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Start Date:{' '}
                            {rentalStartDate
                                ? rentalStartDate.toLocaleDateString()
                                : 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-500">
                            End Date:{' '}
                            {rentalEndDate
                                ? rentalEndDate.toLocaleDateString()
                                : 'Not specified'}
                        </p>

                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => deleteRenter(rental.rentalId)}
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
                                <button
                                    onClick={() => setEditingEndDate(null)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ml-2"
                                >
                                    Cancel
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
