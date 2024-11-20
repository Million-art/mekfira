import React from 'react';
import { Office } from '../type'; // Ensure this type matches the Office structure from the form
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OfficeListProps {
  offices: Office[]; // Array of Office objects
  onEditOffice: (office: Office) => void; // Callback to edit an office
  deleteOffice: (officeId: string) => Promise<void>; // Callback to delete an office by its ID
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
          offices.map((office,index) => (
            <li key={index} className="p-4 hover:bg-gray-100 transition duration-150">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Office No: {office.officeNo}</h2>
                  <p className="text-gray-700">Area: {office.area}</p>
                  <p className="text-gray-700">duration: Rented For {office.price} Months</p>
                  <p className="text-gray-600">Floor: {office.floorNo}</p>
                  <p className={`text-gray-600 font-semibold`}>
                    Status: <span className={`text-${office.status === 'Available' ? 'green' : office.status === 'Rented' ? 'blue' : 'yellow'}-600`}>{office.status}</span>
                  </p>
                </div>
                <div className="ml-4 flex">
                  <button
                    onClick={() => onEditOffice(office)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(office.officeId)}
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
