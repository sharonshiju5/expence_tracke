'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../public/logo.png';
const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md border-b border-gray-800 z-50 px-6 py-4 flex justify-between items-center shadow-lg'>
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10  rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-300'>
        <Image className='bg-white' src={logo} alt="Logo" />
        </div>
        <h1 className='text-white text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Seclob Xpense</h1>
      </div>
      <button 
        onClick={handleLogout}
        className='group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25'
      >
        <span className='relative z-10 flex items-center space-x-2'>
          <svg className='w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span>Logout</span>
        </span>
        <div className='absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
      </button>
    </div>
  );
};

export default Header;