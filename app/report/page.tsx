'use client';
import React, { useState, useEffect, useCallback } from 'react'
import { getreport, adminreport } from '@/lib/services/apiService';
import { useAuth } from '@/hooks/useAuth';
import { getCurrentUser } from '@/lib/auth';
import NoDataFound from '@/components/NoDataFound';

const ReportPage = () => {
  useAuth();
  const [searchTerm, setSearchTerm] = useState('')
  const [reportData, setReportData] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [extraSummary, setExtraSummary] = useState<any>({})
  const [selectedDate, setSelectedDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  const fetchReports = useCallback(async (page = 1) => {
    try {
      let response;
      const user = getCurrentUser()
      const admin = user?.role?.toLowerCase() === 'admin'
      if (admin) {
        response = await adminreport(searchTerm,statusFilter, page, 10)
      } else {
        response = await getreport(page, 10, searchTerm, selectedDate, searchTerm, statusFilter)
      }
      if (response?.status === 'success') {
        setReportData(response.data || response.transactions || [])
        setPagination(response.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
        setExtraSummary(response.extraSummary || {})
      } else {
        setReportData([])
      }
    } catch (error) {
      console.log(error);
      setReportData([])
    }
  }, [searchTerm, selectedDate, statusFilter])

  useEffect(() => {
    fetchReports(1)
  }, [fetchReports])

  const handlePageChange = (newPage: number) => {
    fetchReports(newPage)
  }

  return (
    <div className='bg-black min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        {/* Search Bar */}
        <div className="relative flex-1 mx-4">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-4 outline-none"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className='flex justify-between flex-wrap items-center mb-6 gap-4'>
        <h2 className='text-2xl font-bold text-white whitespace-nowrap '>All Reports</h2>
        <div className='flex gap-2 relative'>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='bg-[#2A2A2A] text-white px-4 py-2 rounded-full outline-none text-sm'
          >
            <option value=''>All Status</option>
            <option value='Completed'>Completed</option>
            <option value='Pending'>Pending</option>
          </select>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className='bg-[#2A2A2A] text-white px-4 py-2 rounded-full outline-none text-sm flex items-center gap-2'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select Date'}
          </button>
          {showDatePicker && (
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                setShowDatePicker(false)
              }}
              className='absolute top-12 bg-[#2A2A2A] text-white px-4 py-2 rounded-full outline-none text-sm min-w-[120px]'
              style={{
                colorScheme: 'dark',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              }}
              autoFocus
            />
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <div className='bg-[#2A2A2A] rounded-xl p-4'>
          <p className='text-gray-400 text-sm'>Total Income</p>
          <p className='text-green-400 text-xl font-bold'>QAR {(extraSummary as any)?.totalIncome?.toFixed(2) || '0'}</p>
        </div>
        <div className='bg-[#2A2A2A] rounded-xl p-4'>
          <p className='text-gray-400 text-sm'>Total Expense</p>
          <p className='text-red-400 text-xl font-bold'>QAR {(extraSummary as any)?.totalExpense?.toFixed(2) || '0'}</p>
        </div>
      </div>

      {/* Reports List */}
      <div className='space-y-4 mb-20'>
        {reportData.length === 0 ? (
          <NoDataFound message='No reports found' />
        ) : (
          reportData.map((report: any, index: number) => (
          <div key={report._id} className='bg-[#2A2A2A] rounded-2xl p-6 text-white'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold'>
                  {report.customerName?.substring(0, 2).toUpperCase() || report.enteredBy?.username?.substring(0, 2).toUpperCase() || 'JW'}
                </div>
                <div>
                  <h3 className='font-semibold'>{report.customerName || report.enteredBy?.username || 'User'}</h3>
                  <p className='text-gray-400 text-sm'>{report.itemName || 'Item'}</p>
                </div>
              </div>
              <button className={`px-6 py-2 rounded-full text-sm font-medium ${
                report.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-[#FC95E1] text-black'
              }`}>
                {report.status}
              </button>
            </div>
            
            <div className='grid grid-cols-3 gap-4 text-sm mb-4'>
              <div>
                <p className='text-gray-400'>SI.NO</p>
                <p className='text-white'>0{(pagination.page - 1) * pagination.limit + index + 1}</p>
              </div>
              <div>
                <p className='text-gray-400'>Transaction Date</p>
                <p className='text-white'>{report.date || new Date(report.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className='text-gray-400'>Entered By</p>
                <p className='text-white'>{report.enteredBy?.username || 'Staff'}</p>
              </div>
            </div>
            
            <div className='grid grid-cols-3 gap-4 text-sm'>
              <div>
                <p className='text-gray-400 mb-1'>Amount</p>
                <p className='text-green-400 font-bold'>QAR {report.amount}</p>
              </div>
              <div>
                <p className='text-gray-400 mb-1'>Status</p>
                <p className={`font-bold ${
                  report.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'
                }`}>{report.status}</p>
              </div>
              <div>
                <p className='text-gray-400 mb-1'>Item</p>
                <p className='text-white font-bold'>{report.itemName || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))
        )}
        
        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-6'>
            <button 
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className='px-4 py-2 bg-[#2A2A2A] text-white rounded-lg disabled:opacity-50'
            >
              Previous
            </button>
            
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === pagination.page 
                    ? 'bg-[#FC95E1] text-black' 
                    : 'bg-[#2A2A2A] text-white'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className='px-4 py-2 bg-[#2A2A2A] text-white rounded-lg disabled:opacity-50'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportPage
