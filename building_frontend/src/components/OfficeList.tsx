import React from 'react';
import { Office } from '../type'; // Updated to use 'Office' instead of 'Task'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OfficeListProps {
  offices: Office[];             // Updated to handle 'Office' type instead of 'Task'
  onEditOffice: (office: Office) => void;  // Updated function to handle editing an 'Office'
  deleteOffice: (officeId: string) => Promise<void>;  // Updated function to handle deleting an 'Office'
}

const OfficeList: React.FC<OfficeListProps> = ({ offices, onEditOffice, deleteOffice }) => {
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
    <div className="overflow-hidden rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {offices.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No offices available.</li>
        ) : (
          offices.map(office => (
            <li key={office.officeId} className="p-4 hover:bg-gray-100 transition duration-150">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{office.area}</h2> {/* Updated to display area */}
                  <p className="text-gray-700">Price: {office.price}</p>  {/* Updated to display price */}
                  <p className="text-gray-600">Floor: {office.floorNo}</p>  {/* Updated to display floor number */}
                  <p className="text-gray-600">Status: {office.status}</p>  {/* Updated to display status */}
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => onEditOffice(office)}  // Use the updated onEditOffice method
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(office.officeId)}  // Use officeId for deletion
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OfficeList;
