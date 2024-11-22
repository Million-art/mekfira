import React, { useState } from 'react';
import { Rental } from '../type';

interface RentalListProps {
  rentals: Rental[];
  deleteRenter: (userId: string) => void;
  extendContract: (rentalId: string, newEndDate: string) => void;
}

const RentalList: React.FC<RentalListProps> = ({ rentals, deleteRenter, extendContract }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEndDate, setEditingEndDate] = useState<string | null>(null);
  const [newEndDate, setNewEndDate] = useState<string>('');

  // Filter rentals based on search query (tenant name or office number)
  const filteredRentals = rentals.filter((rental) =>
    rental.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rental?.office?.officeNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEndDateChange = (rentalId: string) => {
    if (newEndDate) {
      extendContract(rentalId, newEndDate);
      setEditingEndDate(null);
      setNewEndDate('');
    }
  };

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Tenant Name or Office No."
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Rental Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tenant Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Office No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Floor No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Start Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">End Date</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">No rentals available.</td>
              </tr>
            ) : (
              filteredRentals.map((rental) => {
                const rentalStartDate = rental.rentalStartDate ? new Date(rental.rentalStartDate) : null;
                const rentalEndDate = rental.rentalEndDate ? new Date(rental.rentalEndDate) : null;

                return (
                  <tr key={rental.rentalId} className="hover:bg-gray-100 transition duration-150">
                    <td className="px-4 py-2 text-sm text-gray-700">{rental.tenantName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{rental.phone}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{rental?.office?.officeNo || 'Not specified'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{rental?.office?.floorNo || 'Not specified'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {rentalStartDate ? rentalStartDate.toLocaleDateString() : 'Not specified'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {rentalEndDate ? rentalEndDate.toLocaleDateString() : 'Not specified'}
                    </td>
                    <td className="px-4 py-2 text-center flex items-center gap-x-1">
                      <button
                        onClick={() => deleteRenter(rental.rentalId)}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-150"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => setEditingEndDate(rental.rentalId)}
                        className="bg-blue-500 w-[10rem] text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"


                      >
                        {`Extend Contract` }
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Extend Contract Form */}
      {editingEndDate && (
        <div className="mt-4">
          <input
            type="date"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <button
            onClick={() => handleEndDateChange(editingEndDate)}
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
};

export default RentalList;
