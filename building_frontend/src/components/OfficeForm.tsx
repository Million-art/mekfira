import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Office, OfficeError } from '../type';
import api from '../api/api';


const OfficeForm: React.FC<{ addOffice: (office: Office) => void }> = ({ addOffice }) => {
    const [office, setOffice] = useState<Office>({
        officeId: '',
        price: 0,
        area: '',
        floorNo: 0,
        status: 'Available',   
    });

    const [errors, setErrors] = useState<OfficeError>({
        officeId: '',
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
            price: '',
            area: '',
            floorNo: '',
            status: '',
        };

        // Validate officeId
        if (!office.officeId.trim()) {
            validationErrors.officeId = 'Office ID is required.';
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
                    officeId: '',
                    price: 0,
                    area: '',
                    floorNo: 0,
                    status: 'Available',  // Reset status to 'Available'
                });
                setErrors({
                    officeId: '',
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
                {errors.officeId && <p className="text-red-500">{errors.officeId}</p>}
                <input
                    name="officeId"
                    type="text"
                    placeholder="Office ID"
                    value={office.officeId}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.officeId ? 'border-red-500' : ''}`}
                    aria-describedby="officeIdError"
                />
                {errors.price && <p className="text-red-500" id="priceError">{errors.price}</p>}
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={office.price}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.price ? 'border-red-500' : ''}`}
                    aria-describedby="priceError"
                />

                {errors.area && <p className="text-red-500" id="areaError">{errors.area}</p>}
                <input
                    name="area"
                    type="text"
                    placeholder="Area"
                    value={office.area}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.area ? 'border-red-500' : ''}`}
                    aria-describedby="areaError"
                />

                {errors.floorNo && <p className="text-red-500" id="floorNoError">{errors.floorNo}</p>}
                <input
                    name="floorNo"
                    type="number"
                    placeholder="Floor Number"
                    value={office.floorNo}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.floorNo ? 'border-red-500' : ''}`}
                    aria-describedby="floorNoError"
                />

                {errors.status && <p className="text-red-500" id="statusError">{errors.status}</p>}
                <select
                    name="status"
                    value={office.status}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.status ? 'border-red-500' : ''}`}
                    aria-describedby="statusError"
                >
                    <option value={'Available'}>Available</option>
                    <option value={'Rented'}>Rented</option>
                    <option value={'UnderMaintenance'}>Under Maintenance</option>
                </select>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Office'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default OfficeForm;
