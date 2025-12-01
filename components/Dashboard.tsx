// 'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { logout, isAdmin } from '@/lib/auth';
import { getFinancialSummary } from '@/lib/data';
import calendar from "./assetes/calendar.png"
import notification from "./assetes/notification.png"
import Image from "next/image";
import { getDashBoard, getDashBoardAdmin } from '@/lib/services/apiService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}


export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [financialSummary, setFinancialSummary] = useState<any>(null);
  
  async function HandelGetDashBoard() {
    try {
      const response = isAdmin(user) ? await getDashBoardAdmin() : await getDashBoard();
      if (response.success) {
        setFinancialSummary(response.data.userTotals || response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    HandelGetDashBoard();
  }, []);

  return (
    <div className='w-full bg-black h-auto pt-10 p-3'>
      <div className='flex justify-between mb-5 text-white'>
        <button className='w-30 h-12 bg-[#2A2A2A] text-xl whitespace-nowrap mb-5 flex justify-center items-center gap-2 p-5 rounded-2xl'>
            {/* <Image src={calendar} className=' w-7' alt="Notification" /> */}
            All time</button>
        {/* <button className='w-12 h-12 bg-[#2a2a2a] mb-5 rounded-full flex justify-center items-center'>
            <Image src={notification} className=' w-7' alt="Notification" />
        </button> */}
      </div>
      <div className='grid grid-cols-2  gap-3 text-black'>
        <div className='bg-gradient-to-br from-[#16A34A] to-white rounded-2xl p-4'>
          <div className='flex gap-3'>
            <div className='p-1 bg-white rounded-full h-7 w-7'>
              <img className='' src="https://cdn-icons-png.flaticon.com/128/54/54993.png" alt="" />
            </div>
            <h2 className='text-xl mb-3 whitespace-nowrap'>This Month</h2>
          </div>
          <h1 className='font-bold text-xl mb-3'>Total Income</h1>
          <h1 className='font-bold text-2xl mb-3'>QAR {financialSummary?.totalIncome || 0}</h1>
        </div>
        <div className='bg-gradient-to-br from-[#EAB308] to-white rounded-2xl p-4'>
          <div className='flex gap-3'>
            <div className='p-1 bg-white rounded-full h-7 w-7'>
              <img className='' src="https://cdn-icons-png.flaticon.com/128/54/54993.png" alt="" />
            </div>
            <h2 className='text-xl mb-3 whitespace-nowrap'>This Month</h2>
          </div>
          <h1 className='font-bold text-xl mb-3'>Total Pending</h1>
          <h1 className='font-bold text-2xl mb-3'>QAR {financialSummary?.totalPending || 0}</h1>
        </div>        
        <div className='bg-gradient-to-br from-[#DC2626] to-white rounded-2xl p-4'>
          <div className='flex gap-3'>
            <div className='p-1 bg-white rounded-full h-7 w-7'>
              <img className='' src="https://cdn-icons-png.flaticon.com/128/54/54993.png" alt="" />
            </div>
            <h2 className=' text-xl mb-3 whitespace-nowrap'>This Month</h2>
          </div>
          <h1 className='font-bold text-xl mb-3 whitespace-nowrap'>Total Expenses</h1>
          <h1 className='font-bold text-2xl mb-3'>QAR {financialSummary?.totalExpenses || 0}</h1>
        </div>        
        <div className='bg-gradient-to-br from-[#0EA5E9] to-white rounded-2xl p-4'>
          <div className='flex gap-3'>
            <div className='p-1 bg-white rounded-full h-7 w-7'>
              <img className='' src="https://cdn-icons-png.flaticon.com/128/54/54993.png" alt="" />
            </div>
            <h2 className='text-xl mb-3 whitespace-nowrap'>This Month</h2>
          </div>
          <h1 className='font-bold text-xl mb-3'>Net Balance</h1>
          <h1 className='font-bold text-2xl mb-3'>QAR {financialSummary?.netBalance || 0}</h1>
        </div>
      </div>
    </div>
  );
}
