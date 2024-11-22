import React, { useEffect, useState } from 'react';
import { Office, OfficeStatus, Rental } from '@/type';
import fetchOffices from '@/utils/helpers/fetchOffices';
import fetchUsers from '@/utils/helpers/fetchUser';

const Analytics = () => {
  const [offices, setOffices] = useState<Office[]>([]); // Initial state for offices
  const [rentals, setRentals] = useState<Rental[]>([]); // Initialize as an empty array
  console.log('rentals', rentals);

  const activeSection = 'manageOffices';

  useEffect(() => {
    fetchOffices({ setOffices, activeSection });
    fetchUsers({ setRentals, activeSection });
  }, [activeSection]);

  // Analytics calculations
  const totalOffices = offices.length;
  const rentedOffices = offices.filter((office) => office.status === OfficeStatus.Rented).length;
  const availableOffices = offices.filter((office) => office.status === OfficeStatus.Available).length;
  const underMaintenanceOffices = offices.filter(
    (office) => office.status === OfficeStatus.UnderMaintenance
  ).length;

  // Filter rentals based on end date criteria (Rentals that have ended or are equal to today)
  const currentDate = new Date();
  const criticalRentals = rentals.filter((rental) => {
    if (!rental.rentalEndDate) return false;
    const rentalEndDate = new Date(rental.rentalEndDate);

    // Check if the rental end date is before or equal to the current date
    return rentalEndDate <= currentDate;
  });

  console.log('criticals', criticalRentals);

  return (
    <section className="p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Office Analytics</h1>
        <p className="text-gray-600">Overview of office statuses and details.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white shadow rounded-lg">
          <div className="text-4xl font-semibold text-blue-500">{totalOffices}</div>
          <h2 className="mt-2 text-lg font-medium text-gray-700">Total Offices</h2>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <div className="text-4xl font-semibold text-green-500">{rentedOffices}</div>
          <h2 className="mt-2 text-lg font-medium text-gray-700">Rented Offices</h2>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <div className="text-4xl font-semibold text-yellow-500">{availableOffices}</div>
          <h2 className="mt-2 text-lg font-medium text-gray-700">Available Offices</h2>
        </div>
        <div className="p-6 bg-white w-fit shadow rounded-lg">
          <div className="text-4xl font-semibold text-red-500">{underMaintenanceOffices}</div>
          <h2 className="mt-2 text-lg font-medium text-gray-700">Under Maintenance</h2>
        </div>
      </div>

      {/* Rentals Near or Past End Date */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Critical Rentals</h2>
          <div className="carousel carousel-center space-x-4 bg-white p-6 shadow rounded-lg">
            {criticalRentals.length > 0 ? (
              criticalRentals.map((rental, index) => (
                <div
                  key={rental.rentalId}
                  className="carousel-item w-96 flex-none bg-white p-4 rounded-lg shadow-md"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Tenant: {rental.tenantName}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      Phone: {rental.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      Office: {rental.office.officeNo} (Floor:{' '}
                      {rental.office.floorNo})
                    </p> 
                    Ended at {rental.rentalEndDate ? new Date(rental.rentalEndDate).toLocaleDateString() : "N/A"}
                  </div>
                  <span className="text-sm px-3 py-1  text-red-600 rounded-full">
                    Ended
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No critical rentals to display.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
