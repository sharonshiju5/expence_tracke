import { getGraph } from '@/lib/services/apiService';
import React, { useEffect, useState } from 'react'

const Graph = () => {
  const [graphData, setGraphData] = useState<any[]>([]);

  async function fetchGraphData() {
    try {
      const response = await getGraph();
      console.log("Graph data:", response);
      if (response?.success && response?.data) {
        setGraphData(response.data);
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  }

  useEffect(() => {
    fetchGraphData();
  }, []); 

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...graphData.map(d => Math.max(d.totalIncome, d.totalExpense)),
    1 // Minimum value to avoid division by zero
  );

  // Scale height (max 130px)
  const getScaledHeight = (value: number) => {
    return (value / maxValue) * 130;
  };

  // Get day abbreviation
  const getDayAbbr = (day: string) => {
    return day.substring(0, 3);
  };

  return (
    <div className='w-full p-5 text-white'>
      <div className='flex justify-between items-center mb-5'>
        <span className='text-2xl'>
            Cash Flow <br />
            <h6 className='text-gray-800 text-sm'>weekly</h6>
        </span>
        <button className='bg-[#2a2a2a] h-10 w-30 text-xl rounded-2xl'>
           weekly
        </button>
      </div>
      <div className='space-y-4'>
        <div className='flex gap-6 mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-[#e91e63] rounded'></div>
            <span className='text-sm'>Income</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-[#f48fb1] rounded'></div>
            <span className='text-sm'>Expense</span>
          </div>
        </div>
        
        <div className='flex items-end justify-between h-48 gap-4'>
          {graphData.length > 0 ? (
            graphData.map((dayData, index) => {
              const incomeHeight = getScaledHeight(dayData.totalIncome);
              const expenseHeight = getScaledHeight(dayData.totalExpense);
              
              return (
                <div key={index} className='flex flex-col items-center flex-1'>
                  <div className='flex items-end gap-1 mb-2'>
                    <div 
                      className='w-4 bg-[#e91e63] rounded-t'
                      style={{ height: `${incomeHeight}px` }}
                    ></div>
                    <div 
                      className='w-4 bg-[#f48fb1] rounded-t'
                      style={{ height: `${expenseHeight}px` }}
                    ></div>
                  </div>
                  <span className='text-xs font-medium'>{getDayAbbr(dayData.day)}</span>
                </div>
              );
            })
          ) : (
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className='flex flex-col items-center flex-1'>
                <div className='flex items-end gap-1 mb-2'>
                  <div className='w-4 bg-[#e91e63] rounded-t' style={{ height: '0px' }}></div>
                  <div className='w-4 bg-[#f48fb1] rounded-t' style={{ height: '0px' }}></div>
                </div>
                <span className='text-xs font-medium'>{day}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Graph