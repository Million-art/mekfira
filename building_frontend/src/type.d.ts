// Define the enum for Office Status
export enum OfficeStatus {
    Available = 'Available',
    Rented = 'Rented',
    UnderMaintenance = 'UnderMaintenance',
}
 
// Define the structure for an office
export interface Office {
    officeId: string;          // Unique identifier for the office
    officeNo: string;          // Office number
    area: string;              // Area of the office (e.g., size in square meters)
    floorNo: number;           // Floor number the office is on
    status: OfficeStatus;      // Current status of the office
}

// Define a separate type for errors (strings for validation messages)
export type OfficeError = {
    officeId?: string;         // Error for officeId
    officeNo?: string;         // Error for officeNo
    area?: string;             // Error for area
    floorNo?: string;          // Error for floorNo
    status?: string;           // Error for status
};

// Define the structure for a user
export interface Renter {
    renterId: string; // Unique identifier for the renter
    name: string;     // Name of the renter
    phone: string;    // Contact number of the renter
}
export interface Rental {
    rentalId: string; // UUID as a string
    tenantName: string;
    phone: string;
    rentedOfficeId: string; // UUID as a string
    rentalStartDate: Date; // ISO format date string
    rentalEndDate?: Date;  // Optional, ISO format date string
    office: {
        officeNo: string;
        area: string;
        floorNo: number;
        status: OfficeStatus;  // Use OfficeStatus enum here
    };
}

// RentOfficeForm for collecting office rental details
export interface RentOfficeForm {
    renter: Renter;                // Renter details
    rentedOfficeId: string;        // Selected office ID (related to Office.officeId)
    rentedOfficeNo: string;        // Selected office number (for display purposes)
    rentedFloorNo: number;         // Selected office floor number
    rentalStartDate: string;       // Start date of the rental (ISO format: YYYY-MM-DD)
    rentalEndDate: string;         // End date of the rental (ISO format: YYYY-MM-DD)
}

// RentOfficeError for handling validation errors in RentOfficeForm
export interface RentOfficeError {
    renter?: {
        name?: string;              // Error for renter's name
        phone?: string;             // Error for renter's phone
    };
    rentedOfficeId?: string;       // Error for the selected office
    rentalStartDate?: string;      // Error for start date
    rentalEndDate?: string;        // Error for end date
}

// Define the active sections in your dashboard
export type ActiveSection = 'dashboard' | 'addOffice' | 'manageOffices' | 'addRental' | 'manageUsers';

// Define props for the Dashboard component
export interface DashboardProps {
    activeSection: ActiveSection; // Active section to show in the dashboard
}
