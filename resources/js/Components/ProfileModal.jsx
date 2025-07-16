import React from 'react';
import { usePage } from '@inertiajs/react';

export default function ProfileModal({ onClose }) {
    const { auth } = usePage().props;
    return (
        <div className="fixed inset-0 flex items-center justify-center     z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <p><strong>Name:</strong> {auth.user.name}</p>
                <p><strong>Email:</strong> {auth.user.email}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
