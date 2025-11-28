'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    
    setLoading(true)
    try {
      // Add your forgot password API call here
      // const response = await forgotPasswordAPI(email)
      toast.success('OTP sent to your email!')
      // You can redirect to OTP verification page if needed
    } catch (error) {
      toast.error('Failed to send OTP')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-black min-h-screen relative text-white p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-20'>
        <button 
          onClick={() => router.back()}
          className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        <h1 className='text-2xl font-bold'>Login</h1>
        <div className='w-12'></div>
      </div>

      {/* Form Content */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold mb-4'>Reset Password!</h2>
        <p className='text-gray-400 text-sm px-4'>
          Enter the email associated with your account and we'll send an OTP to reset your password.
        </p>
      </div>

      {/* Email Input */}
      <div className='mb-8'>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none'
        />
      </div>

      <Toaster position='top-center' />

      {/* Send OTP Button */}
      <button
        onClick={handleSendOTP}
        disabled={loading}
        className='absolute bottom-24 w-[90%] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full py-4 text-black font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70'
      >
        {loading ? (
          <>
            <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            Sending...
          </>
        ) : (
          'Send OTP'
        )}
      </button>
    </div>
  )
}

export default ForgotPasswordPage