import React, { useEffect, useState } from 'react'
import add from "./assetes/add.png"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getIncome } from '@/lib/services/apiService';
import { getCurrentUser } from '@/lib/auth';

const Transactions = () => {
    const router = useRouter();
    const [expenses, setExpensesData] = useState([]);
    const [searchTerm] = useState('');

    async function HandelGetExpence() {
        try {
            const response = await getIncome()
            console.log('API Response:', response)
            if (response.status === 'success') {
                setExpensesData(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        HandelGetExpence()
    }, [])
    
    return (
        <div className='w-full p-5 text-white mb-20'>
            {/* <div className='w-full flex gap-4 text-sm '>
                <button className='w-full h-13 whitespace-nowrap bg-[#FC95E1] p-3 rounded-4xl flex items-center justify-center'>
                    <Image className='invert-100 w-5 h-5 mr-2' src={add} alt="Add" />
                    Add Transaction
                </button>
                <button className='w-full h-13 whitespace-nowrap bg-[#FFFFFF] p-3 rounded-4xl flex items-center justify-center text-black'>
                    <Image className='w-5 h-5 mr-2' src={add} alt="Add" />
                    Add Transaction
                </button>
            </div> */}
            <div className="mt-5 text-2xl font-semibold flex justify-between items-center">Recent Transactions
                <button onClick={() => {
                    const user = getCurrentUser();
                    const route = user?.role === 'admin' ? '/report' : '/transaction';
                    router.push(route);
                }} className='text-[#FC95E1] text-sm'>View All</button>
            </div>
            <div className='mt-4 space-y-3'>
                {expenses.length > 0 ? expenses.slice(0, 5).map((item: any, index: number) => {
                    return (
                        <div key={index} className='rounded-2xl p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold'>
                                    {item.customerName?.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <h3 className='text-white font-medium'>{item.customerName}</h3>
                                    <p className='text-gray-400 text-sm'>{item.customerNumber}</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='font-semibold text-green-400'>+QAR {item.amount}</p>
                                <span className='text-white text-xs px-3 py-1 rounded-full bg-green-600'>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    );
                }) :("no data found")}
            </div>
        </div>
    )
}

export default Transactions
