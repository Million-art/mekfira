import React, { useState, useEffect } from 'react';
import { Office } from '../type'; // Use 'Office' type instead of 'Task'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {officeStatusOptions} from '@/utils/officeStatusOptions'; // A utility for office status options (Available, Rented, UnderMaintenance)

interface EditOfficeProps {
  office: Office;
  onCancel: () => void;
  onOfficeUpdated: (updatedOffice: Office) => Promise<void>; // Function to handle office update
}

const EditOffice: React.FC<EditOfficeProps> = ({ office, onCancel, onOfficeUpdated }) => {
  const [formData, setFormData] = useState<Office>(office);

  useEffect(() => {
    setFormData(office); // Reset form data when office prop changes
  }, [office]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onOfficeUpdated(formData);
      toast.success('Office updated successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Error updating office. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Edit Office</h2>

      <div>
        <label htmlFor="area" className="block text-sm font-medium mb-1">Area</label>
        <input
          type="text"
          name="area"
          id="area"
          value={formData.area}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
   

      <div className="mt-2">
        <label htmlFor="floorNo" className="block text-sm font-medium mb-1">Floor Number</label>
        <input
          type="number"
          name="floorNo"
          id="floorNo"
          value={formData.floorNo}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {officeStatusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 transition duration-150">Update Office</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-150">Cancel</button>
      </div>
    </form>
  );
};

export default EditOffice;
