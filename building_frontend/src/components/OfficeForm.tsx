import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Office, OfficeError } from '../type';
import api from '../api/api';

const OfficeForm: React.FC<{ addOffice: (office: Office) => void }> = ({ addOffice }) => {
    const [office, setOffice] = useState<Office>({
        officeId: '',  // This will not be used in the form
        officeNo: '',
        price: 0,
        area: '',
        floorNo: 0,
        status: 'Available',
    });

    const [errors, setErrors] = useState<OfficeError>({
        officeId: '',
        officeNo: '',
        price: '',
        area: '',
        floorNo: '',
        status: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOffice((prevOffice) => ({
            ...prevOffice,
            [name]: name === 'price' || name === 'floorNo' ? Number(value) : value,
        }));
    };

    const validate = (): OfficeError => {
        const validationErrors: OfficeError = {
            officeId: '',
            officeNo: '',
            price: '',
            area: '',
            floorNo: '',
            status: '',
        };

        // Validate officeNo (it should not be empty)
        if (!office.officeNo.trim()) {
            validationErrors.officeNo = 'Office Number is required.';
        }

        // Validate price (it should be greater than 0)
        if (office.price <= 0) {
            validationErrors.price = 'Price must be greater than zero.';
        }

        // Validate area (it should not be empty)
        if (!office.area.trim()) {
            validationErrors.area = 'Area is required.';
        }

        // Validate floorNo (it should be a positive number)
        if (office.floorNo <= 0) {
            validationErrors.floorNo = 'Floor number must be greater than zero.';
        }

        // Validate status (it should be one of the valid values)
        if (!['Available', 'Rented', 'UnderMaintenance'].includes(office.status)) {
            validationErrors.status = 'Please select a valid status.';
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
            const response = await api.post('api/offices/add', office);
            if (response.status === 201) {
                addOffice(response.data);  // Add the new office to the list
                // Reset the form after successful submission
                setOffice({
                    officeId: '',  // Reset officeId to an empty string
                    officeNo: '',
                    price: 0,
                    area: '',
                    floorNo: 0,
                    status: 'Available',  // Reset status to 'Available'
                });
                setErrors({
                    officeId: '',
                    officeNo: '',
                    price: '',
                    area: '',
                    floorNo: '',
                    status: '',
                });
                toast.success('Office added successfully!');
            } else {
                toast.error('Failed to add office.');
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const apiErrors: OfficeError = error.response.data.errors.reduce(
                    (acc: OfficeError, error: { param: string; msg: string }) => {
                        if (acc.hasOwnProperty(error.param)) {
                            acc[error.param as keyof OfficeError] = error.msg;
                        }
                        return acc;
                    },
                    {} as OfficeError
                );
                setErrors(apiErrors);
            } else {
                setErrors({
                    officeId: 'An unexpected error occurred. Please try again later.',
                    officeNo: '',
                    price: '',
                    area: '',
                    floorNo: '',
                    status: '',
                });
                toast.error('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Add Office</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                {/* Office Number */}
                {errors.officeNo && <p className="text-red-500">{errors.officeNo}</p>}
                <div className="mb-4">
                    <label htmlFor="officeNo" className="block text-sm font-medium text-gray-700">Office Number</label>
                    <input
                        name="officeNo"
                        type="text"
                        id="officeNo"
                        placeholder="Office Number"
                        value={office.officeNo}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.officeNo ? 'border-red-500' : ''}`}
                        aria-describedby="officeNoError"
                    />
                </div>

                {/* Price */}
                {errors.price && <p className="text-red-500">{errors.price}</p>}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        name="price"
                        type="number"
                        id="price"
                        placeholder="Price"
                        value={office.price}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.price ? 'border-red-500' : ''}`}
                        aria-describedby="priceError"
                    />
                </div>

                {/* Area */}
                {errors.area && <p className="text-red-500">{errors.area}</p>}
                <div className="mb-4">
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                    <input
                        name="area"
                        type="text"
                        id="area"
                        placeholder="Area"
                        value={office.area}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.area ? 'border-red-500' : ''}`}
                        aria-describedby="areaError"
                    />
                </div>

                {/* Floor Number */}
                {errors.floorNo && <p className="text-red-500">{errors.floorNo}</p>}
                <div className="mb-4">
                    <label htmlFor="floorNo" className="block text-sm font-medium text-gray-700">Floor Number</label>
                    <input
                        name="floorNo"
                        type="number"
                        id="floorNo"
                        placeholder="Floor Number"
                        value={office.floorNo}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.floorNo ? 'border-red-500' : ''}`}
                        aria-describedby="floorNoError"
                    />
                </div>

                {/* Status */}
                {errors.status && <p className="text-red-500">{errors.status}</p>}
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={office.status}
                        onChange={handleChange}
                        className={`border p-2 w-full ${errors.status ? 'border-red-500' : ''}`}
                        aria-describedby="statusError"
                    >
                        <option value={'Available'}>Available</option>
                        <option value={'Rented'}>Rented</option>
                        <option value={'UnderMaintenance'}>Under Maintenance</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Office'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default OfficeForm;
