'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-black z-50 p-4  flex justify-between items-center'>
      <div className='flex items-center mr-4'>
        <h1 className='text-white text-xl ml-'>Expense Tracker</h1>
      </div>
      <button 
        onClick={handleLogout}
        className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600'
      >
        Logout
      </button>
    </div>
  );
};

export default Header;