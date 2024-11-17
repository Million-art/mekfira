import React, { useState, useEffect } from 'react';
import { Office } from '../type'; // Adjusted to use 'Office' instead of 'Task'
import api from '@/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfficeList from './OfficeList'; // Assuming you will have an OfficeList component
import EditOffice from './EditOffice'; // Assuming you will have an EditOffice component

interface OfficePageProps {
  offices: Office[];              // Adjusted to use 'Office[]' instead of 'Task[]'
  deleteOffice: (officeId: string) => Promise<void>; // Adjusted to use office
}

const OfficePage: React.FC<OfficePageProps> = ({ offices, deleteOffice }) => {
  const [filteredOffices, setFilteredOffices] = useState<Office[]>(offices); // Adjusted for 'Office' type
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingOffice, setEditingOffice] = useState<Office | null>(null); // Adjusted to 'Office'

  useEffect(() => {
    const filtered = offices.filter(office =>
      office.area?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.price.toString().includes(searchQuery) // Assuming price is searchable as a string
    );
    setFilteredOffices(filtered);
  }, [searchQuery, offices]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEditOffice = (office: Office) => {
    setEditingOffice(office); // Handle editing of office
  };

  const handleCancelEdit = () => {
    setEditingOffice(null);
  };

  const handleOfficeUpdated = async (updatedOffice: Office) => {
    try {
      const response = await api.put(`api/offices/edit/${updatedOffice.officeId}`, updatedOffice);
      if (response.status === 200) {
        setFilteredOffices(prevOffices =>
          prevOffices.map(office => (office.officeId === updatedOffice.officeId ? updatedOffice : office))
        );
        setEditingOffice(null);
      } else {
        toast.error('Failed to update office. Please try again.');
      }
    } catch (error) {
      console.error('Error updating office:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Office Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search offices..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 w-full"
        />
      </div>

      {editingOffice ? (
        <EditOffice
          office={editingOffice}
          onCancel={handleCancelEdit}
          onOfficeUpdated={handleOfficeUpdated}
        />
      ) : (
        <OfficeList offices={filteredOffices} onEditOffice={handleEditOffice} deleteOffice={deleteOffice} />
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default OfficePage;
