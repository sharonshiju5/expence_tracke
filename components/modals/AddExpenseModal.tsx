'use client';

import React, { useState } from 'react';
import { addexpence } from '@/lib/services/apiService';

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        mobileNumber: '',
        itemName: '',
        description: '',
        amount: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const expenseDate = new Date().toISOString();
            const title = formData.itemName || formData.customerName;
            await addexpence(expenseDate, title, formData.description, parseFloat(formData.amount));
            onSuccess();
            onClose();
            setFormData({
                customerName: '',
                mobileNumber: '',
                itemName: '',
                description: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2A2A2A] rounded-3xl w-full max-w-md p-6 text-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add Expense</h2>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Customer Name */}
                    <div>
                        <label className="block text-white mb-2">Customer Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            className="w-full bg-black text-white placeholder-gray-500 rounded-full px-4 py-3 outline-none"
                            required
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-white mb-2">Mobile Number</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                                <span className="text-white">+91</span>
                                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div className="w-px h-4 bg-gray-600 ml-2"></div>
                            </div>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="Enter Mobile Number"
                                className="w-full bg-black text-white placeholder-gray-500 rounded-full px-4 py-3 pl-20 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Item Name */}
                    <div>
                        <label className="block text-white mb-2">Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleInputChange}
                            placeholder="Enter Item Name"
                            className="w-full bg-black text-white placeholder-gray-500 rounded-full px-4 py-3 outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter Description"
                            rows={4}
                            className="w-full bg-black text-white placeholder-gray-500 rounded-2xl px-4 py-3 outline-none resize-none"
                            required
                        />
                    </div>

                    {/* Amount Spent */}
                    <div>
                        <label className="block text-white mb-2">Amount Spent</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                                <span className="text-white">QAR</span>
                                <div className="w-px h-4 bg-gray-600 ml-3"></div>
                            </div>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="w-full bg-black text-white placeholder-gray-500 rounded-full px-4 py-3 pl-16 outline-none"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#FC95E1] text-black font-medium py-3 rounded-full mt-6"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;