'use client';

import React, { useState } from 'react'
import notification from "@/components/assetes/notification.png"
import Image from "next/image";
const TransactionPage = () => {
    const [activeTab, setActiveTab] = useState('Income')
    const [searchTerm, setSearchTerm] = useState('')

    const transactions = [
        { id: 1, name: 'Sooraj KV', phone: '+91 7994263529', date: '25-11-2025', time: '11:25 AM', amount: 'QAR 2,500' },
        { id: 2, name: 'Sooraj', phone: '+91 7994263529', date: '25-11-2025', time: '11:25 AM', amount: 'QAR 2,500' },
        { id: 3, name: 'Sooraj', phone: '+91 7994263529', date: '25-11-2025', time: '11:25 AM', amount: 'QAR 2,500' },
        { id: 4, name: 'Sooraj', phone: '+91 7994263529', date: '25-11-2025', time: '11:25 AM', amount: 'QAR 2,500' },
    ]

    return (
        <div className='bg-black min-h-screen p-4'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <button className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center' suppressHydrationWarning>
                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                </button>
                <button className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center' suppressHydrationWarning>
                    <Image className='w-6 h-6' src={notification} alt="Notification" />
                </button>
            </div>

            {/* Filter Tabs */}
            <div className='flex gap-3 mb-6'>
                {['Income', 'Expense', 'Updated'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-full font-medium ${activeTab === tab
                            ? 'bg-[#FC95E1] text-black'
                            : 'bg-[#2A2A2A] text-white'
                            }`}
                        suppressHydrationWarning
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </span>

                <input
                    type="text"
                    placeholder="Search name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-4 text-base outline-none"
                />
            </div>
            {/* Section Header */}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-gray-300'>All Transactions</h2>
                <button className='bg-[#2A2A2A] text-white px-4 py-2 rounded-full flex items-center gap-2' suppressHydrationWarning>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    Today
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                </button>
            </div>

            {/* Transactions List */}
            <div className='space-y-4'>
                {/* Featured Transaction */}
                <div className='bg-[#2A2A2A] rounded-2xl p-6 text-white'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-3'>
                            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold'>
                                JW
                            </div>
                            <div>
                                <h3 className='font-semibold'>Sooraj KV</h3>
                                <p className='text-gray-400 text-sm'>+91 7994263529</p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-gray-400 text-sm'>11:25 AM</p>
                            <svg className='w-5 h-5 text-gray-400 ml-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                            </svg>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4 text-sm mb-4'>
                        <div>
                            <p className='text-gray-400'>SI.NO</p>
                            <p className='text-white'>01</p>
                        </div>
                        <div>
                            <p className='text-gray-400'>Transaction Date</p>
                            <p className='text-white'>25-11-2025</p>
                        </div>
                        <div>
                            <p className='text-gray-400'>Transaction Time</p>
                            <p className='text-white'>11:25 AM</p>
                        </div>
                    </div>

                    <div>
                        <p className='text-gray-400 text-sm mb-1'>Amount Received</p>
                        <p className='text-green-400 text-xl font-bold'>QAR 2,500</p>
                    </div>
                </div>

                {/* Transaction List Items */}
                {transactions.map((transaction, index) => (
                    <div key={transaction.id} className='bg-[#2A2A2A] rounded-2xl p-4 text-white'>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-4 text-sm'>
                                <div>
                                    <p className='text-gray-400'>SI.NO</p>
                                    <p className='text-white'>0{index + 2}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Name</p>
                                    <p className='text-white'>{transaction.name}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Date</p>
                                    <p className='text-white'>{transaction.date}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Amount</p>
                                    <p className='text-green-400'>{transaction.amount}</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-gray-400 text-sm'>{transaction.time}</p>
                                <svg className='w-5 h-5 text-gray-400 ml-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransactionPage
