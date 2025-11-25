import React from 'react'

const Graph = () => {
  return (
    <div className='w-full  p-5 text-white'>
      <div className='flex justify-between items-center mb-5'>
        <span className=' text-2xl'>
            Cash Flow <br />
            <h6 className='text-gray-800 text-sm'>This week</h6>
        </span>
        <button className='bg-[#2a2a2a] h-10 w-35 rounded-2xl'>
            This Week
        </button>
      </div>
      <div className='space-y-4'>
        <div className='flex gap-6 mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-[#e91e63] rounded'></div>
            <span className=' text-sm'>Income</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-[#f48fb1] rounded'></div>
            <span className=' text-sm'>Expense</span>
          </div>
        </div>
        
        <div className='flex items-end justify-between h-48 gap-4'>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const incomeHeights = [60, 80, 70, 90, 120, 100, 85];
            const expenseHeights = [40, 95, 45, 110, 75, 65, 130];
            
            return (
              <div key={day} className='flex flex-col items-center flex-1'>
                <div className='flex items-end gap-1 mb-2'>
                  <div 
                    className='w-4 bg-[#e91e63] rounded-t'
                    style={{ height: `${incomeHeights[index]}px` }}
                  ></div>
                  <div 
                    className='w-4 bg-[#f48fb1] rounded-t'
                    style={{ height: `${expenseHeights[index]}px` }}
                  ></div>
                </div>
                <span className=' text-xs font-medium'>{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Graph
