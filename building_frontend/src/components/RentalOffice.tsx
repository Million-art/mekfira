import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Office, RentOfficeForm, RentOfficeError, ActiveSection } from '../type';
import api from '@/api/api';
import fetchOffices from '@/utils/helpers/fetchOffices';
import axios from 'axios';

interface RentOfficeProps {
    activeSection: ActiveSection;
}

const RentOffice: React.FC<RentOfficeProps> = ({ activeSection }) => {
    const [offices, setOffices] = useState<Office[]>([]); // Initial state for offices

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchOffices({ setOffices, activeSection });
             } catch (error) {
                console.error('Error fetching offices:', error);
            }
        };

        fetchData();
    }, [activeSection]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRentalDetails((prevDetails) => {
            if (name === 'rentedOfficeId') {
                // Update office details when office is selected
                const selectedOffice = offices.find((office) => office.officeId === value);
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
            console.log('Loading', rentalDetails);
            // Simulate API call and send rentalDetails as payload
            const response = await api.post('api/rentals/add', rentalDetails)
            const updateOfficeResponse = await api.patch(
                `api/offices/edit/${rentalDetails.rentedOfficeId}`,
                { status: 'rented' } // Pass the data as a JSON object in the body
            );
                        console.log(updateOfficeResponse)
            if (response.status === 201) {
                toast.success('Office rented successfully!');
                setRentalDetails({
                    renter: { name: '', phone: '' },
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
            setLoading(false);
            // Handle specific API errors based on the response error
            if (axios.isAxiosError(error)) {
                const { status, data } = error.response || {};

                if (status === 400 && data.message === 'This office is already rented.') {
                    toast.error('This office is already rented.');
                } else if (status === 400 && data.message === 'Invalid date range.') {
                    toast.error('Rental start date must be earlier than the end date.');
                } else if (status === 404) {
                    toast.error('Office not found.');
                } else if (status === 500) {
                    toast.error('Server error. Please try again later.');
                } else if (status === 401) {
                    toast.error('Unauthorized. Please login.');
                } else if (status === 403) {
                    toast.error('You do not have permission to rent this office.');
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else if (error) {
                // The request was made, but no response was received
                toast.error('Network error. Please check your connection.');
            } else {
                // Something went wrong setting up the request
                toast.error('An error occurred while setting up the request.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Rent Office</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                {/* Office Selection */}
                {errors.rentedOfficeId && <p className="text-red-500">{errors.rentedOfficeId}</p>}
                <div className="mb-4">
                    <label htmlFor="rentedOfficeId" className="block text-sm font-medium text-gray-700">
                        Select Office
                    </label>
                    <select
                        name="rentedOfficeId"
                        value={rentalDetails.rentedOfficeId}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.rentedOfficeId ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select an office</option>
                        {offices
                            .filter((office) => office.status === 'Available')
                            .map((office) => (
                                <option key={office.officeId} value={office.officeId}>
                                    {office.officeNo} - Floor {office.floorNo}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Renter Name */}
                {errors.renter?.name && <p className="text-red-500">{errors.renter?.name}</p>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Renter Name
                    </label>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        value={renter.phone}
                        onChange={handleRenterChange}
                        className={`border p-2 w-full ${errors.renter?.phone ? 'border-red-500' : ''}`}
                    />
                </div>

                {/* Rental Start Date */}
                {errors.rentalStartDate && <p className="text-red-500">{errors.rentalStartDate}</p>}
                <div className="mb-4">
                    <label htmlFor="rentalStartDate" className="block text-sm font-medium text-gray-700">
                        Rental Start Date
                    </label>
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
                    <label htmlFor="rentalEndDate" className="block text-sm font-medium text-gray-700">
                        Rental End Date
                    </label>
                    <input
                        name="rentalEndDate"
                        type="date"
                        value={rentalDetails.rentalEndDate}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.rentalEndDate ? 'border-red-500' : ''}`}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RentOffice;
