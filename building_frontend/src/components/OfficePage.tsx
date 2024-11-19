import React, { useState, useEffect } from 'react';
import { Office } from '../type';
import api from '@/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfficeList from './OfficeList';
import EditOffice from './EditOffice';

interface OfficePageProps {
  offices: Office[];
  deleteOffice: (officeId: string) => Promise<void>;
}

const OfficePage: React.FC<OfficePageProps> = ({ offices, deleteOffice }) => {
  const [filteredOffices, setFilteredOffices] = useState<Office[]>(offices);
  const [selectedStatus, setSelectedStatus] = useState<string>('all'); // Added status filter
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);

  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredOffices(offices);
    } else {
      setFilteredOffices(offices.filter(office => office?.status === selectedStatus));
    }
  }, [selectedStatus, offices]);

  const handleEditOffice = (office: Office) => {
    setEditingOffice(office);
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
        toast.success('Office updated successfully.');
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

      {/* Status Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="UnderMaintenance">Under Maintenance</option>
        </select>
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
