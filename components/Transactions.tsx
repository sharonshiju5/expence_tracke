import React from 'react'
import add from "./assetes/add.png"
import Image from "next/image";

const Transactions = () => {

    const data = [
  {
    name: "John Wick",
    phone: "+91 7994263529",
    amount: "+QAR 2,300",
    status: "Received",
  },
  {
    name: "Emily Carter",
    phone: "+974 55234122",
    amount: "-QAR 1,050",
    status: "Paid",
  },
  {
    name: "Michael Jordan",
    phone: "+91 8895632145",
    amount: "+QAR 4,700",
    status: "Pending",
  },
  {
    name: "Sophia Fernandes",
    phone: "+974 66453278",
    amount: "-QAR 650",
    status: "Paid",
  },
  {
    name: "Liam Thomas",
    phone: "+91 9845632011",
    amount: "+QAR 900",
    status: "Received",
  },
];

    return (
        <div className='w-full p-5 text-white mb-20'>
            <div className='w-full flex gap-4'>
                <button className='w-full h-13 bg-[#FC95E1] p-3 rounded-4xl flex items-center justify-center'>
                    <Image className='w-5 h-5 mr-2' src={add} alt="Add" />
                    Add Transaction
                </button>
                <button className='w-full h-13 bg-[#FFFFFF] p-3 rounded-4xl flex items-center justify-center text-black'>
                    <Image className='w-5 h-5 mr-2' src={add} alt="Add" />
                    Add Transaction
                </button>
            </div>
            <div className="mt-5 text-2xl font-semibold flex justify-between items-center">Recent Transactions
                <button className='text-[#FC95E1] text-sm'>View All</button>
            </div>
            <div className='mt-4 space-y-3'>
                {data.map((item, index) => {
                    const getStatusColor = (status: string) => {
                        switch(status) {
                            case 'Received': return '#16A34A';
                            case 'Pending': return '#EAB308';
                            case 'Paid': return '#DC2626';
                            default: return '#16A34A';
                        }
                    };
                    
                    return (
                        <div key={index} className=' rounded-2xl p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold'>
                                    {item.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className='text-white font-medium'>{item.name}</h3>
                                    <p className='text-gray-400 text-sm'>{item.phone}</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className={`font-semibold ${item.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.amount}</p>
                                <span 
                                    className='text-white text-xs px-3 py-1 rounded-full w-20 text-center inline-block'
                                    style={{ backgroundColor: getStatusColor(item.status) }}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Transactions
