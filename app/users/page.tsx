'use client';
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth';
import notification from "@/components/assetes/notification.png"
import Image from "next/image";
import AddUserModal from '@/components/modals/AddUserModal';
import { getusers } from '@/lib/services/apiService';

const UsersPage = () => {
  useAuth('admin'); // Only admins can access this page
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  async function FetchUsers() {
    try {
      const response = await getusers(searchTerm)
      if (response.statusCode === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchUsers()
  }, [searchTerm])

  return (
    <div className='bg-black min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        {/* <button 
          onClick={() => window.history.back()}
          className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center'
        >
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button> */}
        {/* <button className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center'>
          <Image className='w-6 h-6' src={notification} alt="Notification" />
        </button> */}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
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

      {/* Section Header */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-white'>All Users</h2>
        <button 
          onClick={() => setShowAddUserModal(true)}
          className='bg-[#FC95E1] text-black px-6 py-3 rounded-full flex items-center gap-2 font-medium'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
          Create User
        </button>
      </div>

      {/* Users List */}
      <div className='space-y-4 mb-20'>
        {users.map((user: any, index: number) => (
          <div key={user._id} className='bg-[#2A2A2A] rounded-2xl p-6 text-white'>
            <div className='flex gap-3 items-center'>
              <div className='flex-shrink-0'>
                <p className='text-gray-400 text-xs'>SI.NO</p>
                <p className='text-white text-sm'>{index + 1}</p>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-gray-400 text-xs'>Name</p>
                <p className='text-white text-sm truncate'>{user.username}</p>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-gray-400 text-xs'>Mobile</p>
                <p className='text-white text-sm truncate'>{user.mobile}</p>
              </div>
              <div className='flex-shrink-0'>
                <p className='text-gray-400 text-xs'>Role</p>
                <p className='text-white text-sm'>{user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSuccess={() => {
          FetchUsers();
        }}
      />
    </div>
  )
}

export default UsersPage
