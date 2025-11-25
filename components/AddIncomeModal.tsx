'use client';

import React, { useState } from 'react';
import { addIncome } from '@/lib/services/apiService';

interface AddIncomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!customerName || !customerNumber || !itemName || !amount) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            await addIncome(today, parseFloat(amount), itemName, customerName, customerNumber,status);
            onSuccess();
            onClose();
            // Reset form
            setCustomerName('');
            setCustomerNumber('');
            setItemName('');
            setAmount('');
            setStatus('Pending');
        } catch (error) {
            console.error('Error adding income:', error);
            alert('Failed to add income');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2A2A2A] rounded-3xl w-full max-w-md p-6 text-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Add Income</h2>
                    <button onClick={onClose} className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Customer Name */}
                    <div>
                        <label className="block text-white mb-3 text-lg">Customer Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-black text-white placeholder-gray-400 rounded-full px-6 py-4 outline-none"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-white mb-3 text-lg">Mobile Number</label>
                        <div className="relative">
                            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white flex items-center">
                                <span>+91</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div className="w-px h-6 bg-gray-600 ml-3"></div>
                            </div>
                            <input
                                type="tel"
                                placeholder="Enter Mobile Number"
                                value={customerNumber}
                                onChange={(e) => setCustomerNumber(e.target.value)}
                                className="w-full bg-black text-white placeholder-gray-400 rounded-full px-6 py-4 pl-24 outline-none"
                            />
                        </div>
                    </div>

                    {/* Item Name */}
                    <div>
                        <label className="block text-white mb-3 text-lg">Item Name</label>
                        <input
                            type="text"
                            placeholder="Enter Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="w-full bg-black text-white placeholder-gray-400 rounded-full px-6 py-4 outline-none"
                        />
                    </div>

                    {/* Amount Received */}
                    <div>
                        <label className="block text-white mb-3 text-lg">Amount Received</label>
                        <div className="relative">
                            <div className="absolute left-6 top-1/2 flex transform -translate-y-1/2 text-white">
                                <span>QAR</span>
                                <div className="w-px h-6 bg-gray-600 ml-3"></div>
                            </div>
                            <input
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-black text-white placeholder-gray-400 rounded-full px-6 py-4 pl-20 outline-none"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-white mb-3 text-lg">Status</label>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black text-white rounded-full px-6 py-4 outline-none appearance-none"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-black font-semibold rounded-full py-4 mt-8 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Transaction'}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeModal;