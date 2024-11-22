import React, { useState, useEffect } from 'react';
import { Office, ActiveSection } from '../type';
import api from '@/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfficeList from './OfficeList';
import EditOffice from './EditOffice';
import fetchOffices from '@/utils/helpers/fetchOffices';

interface OfficePageProps {
  activeSection: ActiveSection; // Fix the type for activeSection here
}

const OfficePage: React.FC<OfficePageProps> = ({ activeSection }) => {
  const [offices, setOffices] = useState<Office[]>([]); // Initial state for offices
  const [filteredOffices, setFilteredOffices] = useState<Office[]>([]); // State for filtered offices
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);

  // Fetch offices whenever activeSection changes
  useEffect(() => {
    fetchOffices({ setOffices, activeSection });
  }, [activeSection]);

  // Filter offices based on status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredOffices(offices);
    } else {
      setFilteredOffices(offices.filter(office => office.status === selectedStatus));
    }
  }, [selectedStatus, offices]);

  // Handle edit office
  const handleEditOffice = (office: Office) => {
    setEditingOffice(office);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingOffice(null);
  };

  // Handle office update
  const handleOfficeUpdated = async (updatedOffice: Office) => {
    try {
      const response = await api.patch(`api/offices/edit/${updatedOffice.officeId}`, updatedOffice);
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

  // Delete office by officeId
  const deleteOffice = async (officeId: string) => {
    try {
      await api.delete(`api/offices/delete/${officeId}`);
      setOffices(prevOffices => prevOffices.filter(office => office.officeId !== officeId));
      toast.success('Office deleted successfully.');
    } catch (error) {
      console.error('Error deleting office:', error);
      toast.error('Failed to delete office. Please try again.');
    }
  };

  return (
    <div className="">

      
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

      {/* Render edit office form or office list */}
      {editingOffice ? (
        <EditOffice
          office={editingOffice}
          onCancel={handleCancelEdit}
          onOfficeUpdated={handleOfficeUpdated}
        />
      ) : (
        <OfficeList
          offices={filteredOffices}
          onEditOffice={handleEditOffice}
          deleteOffice={deleteOffice}
        />
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default OfficePage;
