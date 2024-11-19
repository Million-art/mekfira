import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Office, RentOfficeForm, RentOfficeError } from '../type';
import api from '@/api/api';

interface RentOfficeProps {
    addRent: (rent: RentOfficeForm) => void;
    offices: Office[];  // Office list passed as a prop
}

const RentOffice: React.FC<RentOfficeProps> = ({ addRent, offices }) => {
    const [renter, setRenter] = useState({
        renterId: '', 
        name: '',
        phone: '',
    });

    const [rentalDetails, setRentalDetails] = useState<RentOfficeForm>({
        renter: renter,
        rentedOfficeId: '',
        rentedOfficeNo: '',
        rentedFloorNo: 0,
        rentalStartDate: '',
        rentalEndDate: '',
    });

    const [errors, setErrors] = useState<RentOfficeError>({
        renter: { name: '', phone: '' },
        rentedOfficeId: '',
        rentalStartDate: '',
        rentalEndDate: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRentalDetails((prevDetails) => {
            if (name === 'rentedOfficeId') {
                // Update office details when office is selected
                const selectedOffice = offices.find(office => office.officeId === value);
                if (selectedOffice) {
                    return {
                        ...prevDetails,
                        rentedOfficeId: value,
                        rentedOfficeNo: selectedOffice.officeNo,
                        rentedFloorNo: selectedOffice.floorNo,
                    };
                }
            }
            return {
                ...prevDetails,
                [name]: value,
            };
        });
    };

    const handleRenterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRenter((prevRenter) => ({
            ...prevRenter,
            [name]: value,
        }));
        setRentalDetails((prevDetails) => ({
            ...prevDetails,
            renter: {
                ...prevDetails.renter,
                [name]: value,
            },
        }));
    };

    const validate = (): RentOfficeError => {
        const validationErrors: RentOfficeError = {
             rentedOfficeId: '',
            rentalStartDate: '',
            rentalEndDate: '',
        };

        // Validate office selection
        if (rentalDetails.rentedOfficeId.trim() === '') {
            validationErrors.rentedOfficeId = 'Please select an office.';
        }

        // Validate rental dates
        if (rentalDetails.rentalStartDate.trim() === '') {
            validationErrors.rentalStartDate = 'Rental start date is required.';
        }
        if (rentalDetails.rentalEndDate.trim() === '') {
            validationErrors.rentalEndDate = 'Rental end date is required.';
        }

        return validationErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.values(validationErrors).some((error) => error !== '')) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            // Simulate API call and send rentalDetails as payload
            const response = await api.post('api/rentals/add', rentalDetails);

            if (response.status === 201) {
                addRent(response.data); // Add rented office details
                toast.success('Office rented successfully!');
                setRentalDetails({
                    renter: { renterId: '', name: '', phone: '' },
                    rentedOfficeId: '',
                    rentedOfficeNo: '',
                    rentedFloorNo: 0,
                    rentalStartDate: '',
                    rentalEndDate: '',
                });
                setErrors({
                    renter: { name: '', phone: '' },
                    rentedOfficeId: '',
                    rentalStartDate: '',
                    rentalEndDate: '',
                });
            } else {
                toast.error('Failed to rent office.');
            }
        } catch (error) {
            toast.error('An error occurred while renting the office.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Rent Office</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                {/* Office Selection */}
                {errors.rentedOfficeId && <p className="text-red-500">{errors.rentedOfficeId}</p>}
                <div className="mb-4">
                    <label htmlFor="rentedOfficeId" className="block text-sm font-medium text-gray-700">Select Office</label>
                    <select
                        name="rentedOfficeId"
                        value={rentalDetails.rentedOfficeId}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.rentedOfficeId ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select an office</option>
                        {offices.filter(office => office.status === 'Available').map((office) => (
                            <option key={office.officeId} value={office.officeId}>
                                {office.officeNo} - Floor {office.floorNo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Renter Name */}
                {errors.renter?.name && <p className="text-red-500">{errors.renter?.name}</p>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Renter Name</label>
                    <input
                        name="name"
                        type="text"
                        value={renter.name}
                        onChange={handleRenterChange}
                        className={`border p-2 w-full ${errors.renter?.name ? 'border-red-500' : ''}`}
                    />
                </div>

                {/* Renter Phone */}
                {errors.renter?.phone && <p className="text-red-500">{errors.renter?.phone}</p>}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        value={renter.phone}
                        onChange={handleRenterChange}
                        className={`border p-2 w-full ${errors.renter?.phone ? 'border-red-500' : ''}`}
                    />
                </div>

                {/* Rental Start Date */}
                {errors.rentalStartDate && <p className="text-red-500">{errors.rentalStartDate}</p>}
                <div className="mb-4">
                    <label htmlFor="rentalStartDate" className="block text-sm font-medium text-gray-700">Rental Start Date</label>
                    <input
                        name="rentalStartDate"
                        type="date"
                        value={rentalDetails.rentalStartDate}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.rentalStartDate ? 'border-red-500' : ''}`}
                    />
                </div>

                {/* Rental End Date */}
                {errors.rentalEndDate && <p className="text-red-500">{errors.rentalEndDate}</p>}
                <div className="mb-4">
                    <label htmlFor="rentalEndDate" className="block text-sm font-medium text-gray-700">Rental End Date</label>
                    <input
                        name="rentalEndDate"
                        type="date"
                        value={rentalDetails.rentalEndDate}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.rentalEndDate ? 'border-red-500' : ''}`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RentOffice;
