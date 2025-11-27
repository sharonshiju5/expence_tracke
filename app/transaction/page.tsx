'use client';

import React, { useEffect, useState } from 'react'
import notification from "@/components/assetes/notification.png"
import Image from "next/image";
import Nav from "@/components/Nav";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import { getexpence, getIncome, updateIncome } from '@/lib/services/apiService';
import { useAuth } from '@/hooks/useAuth';

const TransactionPage = () => {
    useAuth('user'); // Only users can access this page
    const [activeTab, setActiveTab] = useState('Income')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [expandedTransaction, setExpandedTransaction] = useState<number | string | null>(null)
    const [expenses, setExpensesData] = useState<any[]>([])
    const [incomeData, setIncomeData] = useState<any[]>([])
    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    
    // Filter income data based on status
    const completedTransactions = incomeData.filter((item: any) => item.status !== 'Pending')
    const pendingTransactions = incomeData.filter((item: any) => item.status === 'Pending')

    async function HandelGetExpence() {
        try {
            const response = await getexpence(searchTerm)
            console.log('API Response:', response)
            if (response.status === 'success') {
                setExpensesData(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function HandleGetIncome(status = 'Completed') {
        try {
            const queryParams = `?status=${status}&itemName=${searchTerm}`;
            const response = await getIncome(queryParams)
            if (response.status === 'success') {
                setIncomeData(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateTransaction = async (id: string) => {
        try {
            await updateIncome(id);
            HandleGetIncome('Pending'); // Refresh pending transactions
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    useEffect(() => {
        HandleGetIncome('Completed') // Default to completed transactions
    }, [])

    useEffect(() => {
        if (activeTab === 'Expense') {
            HandelGetExpence()
        } else if (activeTab === 'Income') {
            HandleGetIncome('Completed')
        } else if (activeTab === 'Updated') {
            HandleGetIncome('Pending')
        }
    }, [searchTerm])
    return (
        <div className='bg-black min-h-screen relative p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6 sm:mb-8'>
                <button className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center' suppressHydrationWarning>
                    <svg className='w-4 h-4 sm:w-5 sm:h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                </button>
                <button className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center' suppressHydrationWarning>
                    <Image className='w-5 h-5 sm:w-6 sm:h-6' src={notification} alt="Notification" />
                </button>
            </div>

            {/* Filter Tabs */}
            <div className='flex gap-2 sm:gap-3 mb-6 overflow-x-auto'>
                {['Income', 'Expense', 'Updated'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab)
                            if (tab === 'Expense') {
                                HandelGetExpence()
                            } else if (tab === 'Income') {
                                HandleGetIncome('Completed')
                            } else if (tab === 'Updated') {
                                HandleGetIncome('Pending')
                            }
                        }}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === tab
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
            <div className='flex justify-between items-center mb-4 flex-wrap gap-2'>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-300'>All Transactions</h2>
                <button className='bg-[#2A2A2A] text-white px-3 sm:px-4 py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm sm:text-base' suppressHydrationWarning>
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
            <div className='space-y-4 mb-35'>
                {activeTab === 'Updated' ? (
                    /* Updated Transactions - Show only pending */
                    incomeData.map((transaction: any, index: number) => (
                        <div key={transaction.id} className='bg-[#2A2A2A] rounded-2xl p-6 text-white'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold'>
                                        JW
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>{transaction.customerName}</h3>
                                        <p className='text-gray-400 text-sm'>{transaction.customerNumber}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleUpdateTransaction(transaction._id)}
                                    className='px-6 py-2 bg-[#FC95E1] text-black rounded-full text-sm font-medium'
                                >
                                    Update
                                </button>
                            </div>
                            <div className='grid grid-cols-3 gap-4 text-sm mb-4'>
                                <div>
                                    <p className='text-gray-400'>SI.NO</p>
                                    <p className='text-white'>0{index + 1}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Transaction Date</p>
                                    <p className='text-white'>{transaction.date}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Transaction Time</p>
                                    <p className='text-white'>{transaction.time}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-4 text-sm'>
                                <div>
                                    <p className='text-gray-400 mb-1'>Total Expense</p>
                                    <p className='text-red-400 font-bold'>QAR {transaction.amount}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400 mb-1'>Credited</p>
                                    <p className='text-green-400 font-bold'>QAR 0</p>
                                </div>
                                <div>
                                    <p className='text-gray-400 mb-1'>Balance</p>
                                    <p className='text-yellow-400 font-bold'>QAR {transaction.amount}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : activeTab === 'Expense' ? (
                    <>
                        {/* Expense List Items */}
                        {expenses.map((expense: any, index: number) => (
                            <div key={expense._id} className={`bg-[#2A2A2A] rounded-2xl text-white transition-all duration-300 ease-in-out ${expandedTransaction === expense._id ? 'p-6' : 'p-4'}`}>
                                <div className={`transition-all duration-300 ease-in-out ${expandedTransaction === expense._id ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                    {expandedTransaction === expense._id && (
                                    <>
                                        <div className='flex items-center justify-between mb-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold'>
                                                    {expense.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold'>{expense.title}</h3>
                                                    <p className='text-gray-400 text-sm'>{expense.description}</p>
                                                </div>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-gray-400 text-sm'>{new Date(expense.expenseDate).toLocaleTimeString()}</p>
                                                <button onClick={() => setExpandedTransaction(null)} className='transition-transform duration-200 hover:scale-110'>
                                                    <svg className='w-5 h-5 text-gray-400 ml-auto transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm mb-4'>
                                            <div>
                                                <p className='text-gray-400'>SI.NO</p>
                                                <p className='text-white'>0{index + 1}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-400'>Expense Date</p>
                                                <p className='text-white'>{new Date(expense.expenseDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-400'>Expense Time</p>
                                                <p className='text-white'>{new Date(expense.expenseDate).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-end'>
                                            <div>
                                                <p className='text-gray-400 text-sm mb-1'>Total Expense</p>
                                                <p className='text-red-400 text-xl font-bold'>QAR {expense.amount}</p>
                                            </div>
                                            <div className='flex gap-3'>
                                                <button className='px-6 py-2 border border-red-500 text-red-500 rounded-full text-sm'>
                                                    Delete
                                                </button>
                                                <button className='px-6 py-2 bg-[#FC95E1] text-black rounded-full text-sm'>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                                <div className={`transition-all duration-300 ease-in-out ${expandedTransaction === expense._id ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-screen'}`}>
                                    {expandedTransaction !== expense._id && (
                                    <div className='flex items-center justify-between'>
                                        <div className='flex gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto'>
                                            <div>
                                                <p className='text-gray-400'>SI.NO</p>
                                                <p className='text-white'>0{index + 2}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-400'>Title</p>
                                                <p className='text-white'>{expense.title}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-400'>Date</p>
                                                <p className='text-white'>{new Date(expense.expenseDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-400'>Amount</p>
                                                <p className='text-red-400'>QAR {expense.amount}</p>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-gray-400 text-sm'>{new Date(expense.expenseDate).toLocaleTimeString()}</p>
                                            <button onClick={() => setExpandedTransaction(expense._id)} className='transition-transform duration-200 hover:scale-110'>
                                                <svg className='w-5 h-5 text-gray-400 ml-auto transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                ) : activeTab === 'Income' ? (
                    /* Transaction List Items - Show only completed */
                    incomeData.map((transaction: any, index: number) => (
                    <div key={transaction._id} className={`bg-[#2A2A2A] rounded-2xl text-white transition-all duration-300 ease-in-out ${expandedTransaction === transaction.id ? 'p-6' : 'p-4'}`}>
                        <div className={`transition-all duration-300 ease-in-out ${expandedTransaction === transaction.id ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            {expandedTransaction === transaction.id && (
                            <>
                                <div className='flex items-center justify-between mb-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold'>
                                            {transaction.customerName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <h3 className='font-semibold'>{transaction.customerName}</h3>
                                            <p className='text-gray-400 text-sm'>{transaction.customerNumber}</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-gray-400 text-sm'>{new Date(transaction.createdAt).toLocaleTimeString()}</p>
                                        <button onClick={() => setExpandedTransaction(null)} className='transition-transform duration-200 hover:scale-110'>
                                            <svg className='w-5 h-5 text-gray-400 ml-auto transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm mb-4'>
                                    <div>
                                        <p className='text-gray-400'>SI.NO</p>
                                        <p className='text-white'>0{index + 2}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Transaction Date</p>
                                        <p className='text-white'>{transaction.date}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Transaction Time</p>
                                        <p className='text-white'>{new Date(transaction.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-400 text-sm mb-1'>Amount Received</p>
                                    <p className='text-green-400 text-xl font-bold'>QAR {transaction.amount}</p>
                                </div>
                            </>
                            )}
                        </div>
                        <div className={`transition-all duration-300 ease-in-out ${expandedTransaction === transaction.id ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-screen'}`}>
                            {expandedTransaction !== transaction.id && (
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto'>
                                    <div>
                                        <p className='text-gray-400'>SI.NO</p>
                                        <p className='text-white'>0{index + 2}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Name</p>
                                        <p className='text-white'>{transaction.customerName}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Date</p>
                                        <p className='text-white'>{transaction.date}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400'>Amount</p>
                                        <p className='text-green-400'>QAR {transaction.amount}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-gray-400 text-sm'>{new Date(transaction.createdAt).toLocaleTimeString()}</p>
                                    <button onClick={() => setExpandedTransaction(transaction.id)} className='transition-transform duration-200 hover:scale-110'>
                                        <svg className='w-5 h-5 text-gray-400 ml-auto transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    ))
                ) : null}
            </div>
            <button 
                onClick={() => {
                    if (activeTab === 'Expense') {
                        setShowAddExpenseModal(true);
                    } else {
                        setShowAddIncomeModal(true);
                    }
                }}
                className='w-[90%] sm:w-80 fixed bottom-22 left-1/2 transform -translate-x-1/2 h-14 sm:h-16 bg-[#FC95E1] text-black rounded-3xl text-sm sm:text-base font-medium'
            >
                {activeTab === 'Expense' ? 'Add Expense' : 'Add Income'}
            </button>
            
            <AddIncomeModal 
                isOpen={showAddIncomeModal}
                onClose={() => setShowAddIncomeModal(false)}
                onSuccess={() => {
                    if (activeTab === 'Income') {
                        HandleGetIncome('Completed');
                    } else if (activeTab === 'Updated') {
                        HandleGetIncome('Pending');
                    }
                }}
            />
            
            <AddExpenseModal 
                isOpen={showAddExpenseModal}
                onClose={() => setShowAddExpenseModal(false)}
                onSuccess={() => {
                    HandelGetExpence();
                }}
            />
            
            {/* <Nav /> */}
        </div>
    )
}

export default TransactionPage