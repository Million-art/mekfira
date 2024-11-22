import React, { useState } from 'react';
import { Office } from '../type'; // Ensure this type matches the Office structure from the form
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OfficeListProps {
  offices: Office[]; // Array of Office objects
  onEditOffice: (office: Office) => void; // Callback to edit an office
  deleteOffice: (officeId: string) => Promise<void>; // Callback to delete an office by its ID
}

const OfficeList: React.FC<OfficeListProps> = ({ offices, onEditOffice, deleteOffice }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter offices based on the search query (office number)
  const filteredOffices = offices.filter((office) =>
    office.officeNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (officeId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this office?');
    if (confirmed) {
      deleteOffice(officeId)
        .then(() => {
          toast.success('Office deleted successfully!');
        })
        .catch(() => {
          toast.error('Error deleting office. Please try again.');
        });
    }
  };

  return (
    <div className="p-4">
      {/* Search box */}
      <div className="mb-4 flex items-center justify-between w-full sm:mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Office No."
          className="p-2 border border-gray-300 w-full rounded "
        />
      </div>

      {/* Office Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Office No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Area</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Floor</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffices.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No offices available.</td>
              </tr>
            ) : (
              filteredOffices.map((office, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-150">
                  <td className="px-4 py-2 text-sm text-gray-700">{office.officeNo}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{office.area}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{office.floorNo}</td>
                  <td className={`px-4 py-2 text-sm text-${office.status === 'Available' ? 'green' : office.status === 'Rented' ? 'blue' : 'yellow'}-600`}>
                    {office.status}
                  </td>
                  <td className="px-4 py-2 text-center  flex gap-0 md:gap-2 justify-center space-x-2">
                    <button
                      onClick={() => onEditOffice(office)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(office.officeId)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficeList;
