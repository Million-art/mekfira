// Define the enum for Office Status
export enum OfficeStatus {
    Available = 'Available',
    Rented = 'Rented',
    UnderMaintenance = 'UnderMaintenance',
}
// Define a separate type for errors (strings for validation messages)
export type OfficeError = {
    officeId: string;
    officeNo:string;
    price: string;
    area: string;
    floorNo: string;
    status: string;  // Add error handling for 'status'
};

// Define the structure for an office
export interface Office {
    officeId: string;          // Unique identifier for the office
    officeNo:string;
    price: number;             // Price of the office
    area: string;              // Area of the office (e.g., size in square meters)
    floorNo: number;           // Floor number the office is on
    status: 'Available' | 'Rented' | 'UnderMaintenance' ;      // Current status of the office (Available, Rented, UnderMaintenance)
}

// Define the structure for a user
export interface User {
    id: string;                // UUID for the user
    telegramId: number;        // Telegram ID for the user
    firstName: string;         // First name of the user
    lastName?: string;         // Last name of the user (optional)
    username?: string;         // Username (optional)
    balance: number;           // Balance of the user
    referredBy?: string | null; // Referred by (can be null)
    referral_count: number;    // Count of referrals made by the user
    createdAt: string;         // ISO creation timestamp
    updatedAt: string;         // ISO last updated timestamp
}

// Define the active sections in your dashboard
export type ActiveSection = 'dashboard' | 'addOffice' | 'manageOffices' | 'manageUsers' | 'withdrawals';

// Define props for the Dashboard component
export interface DashboardProps {
    activeSection: ActiveSection; // Active section to show in the dashboard
}
