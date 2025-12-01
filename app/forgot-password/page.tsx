'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ForgotPassword } from '@/lib/services/apiService'

function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    
    setLoading(true)
    try {
      await ForgotPassword(email)
      toast.success('OTP sent to your email!')
      setStep(2)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter OTP')
      return
    }
    // Add OTP verification logic here
    setStep(3)
  }

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    // Add password reset logic here
    toast.success('Password reset successfully!')
    router.push('/login')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Reset Password!</h2>
              <p className='text-gray-400 text-sm px-4'>
                Enter the email associated with your account and we'll send an OTP to reset your password.
              </p>
            </div>
            <div className='mb-8'>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none'
              />
            </div>
            
             <button
              onClick={handleSendOTP}
              disabled={loading}
              className='absolute bottom-24 w-[90%] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full py-4 text-black font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70'
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )
      case 2:
        return (
          <>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Enter OTP</h2>
              <p className='text-gray-400 text-sm px-4'>
                We've sent a 6-digit code to {email}
              </p>
            </div>
            <div className='flex justify-center gap-3 mb-8'>
              {[0, 1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  type='text'
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('')
                    newOtp[index] = e.target.value
                    setOtp(newOtp.join(''))
                    if (e.target.value && index < 4) {
                      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
                      nextInput?.focus()
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement
                      prevInput?.focus()
                    }
                  }}
                  data-index={index}
                  className='w-16 h-16 bg-gray-800 rounded-2xl text-white text-center text-2xl font-bold outline-none border-none'
                />
              ))}
            </div>
            <div className='text-center mb-8'>
              <button className='text-pink-400 font-medium'>Resend OTP</button>
            </div>
            <button
              onClick={handleVerifyOTP}
              className='absolute bottom-24 w-[90%] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full py-4 text-black font-semibold text-lg'
            >
              Verify OTP
            </button>
          </>
        )
      case 3:
        return (
          <>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>New Password</h2>
              <p className='text-gray-400 text-sm px-4'>
                Enter your new password
              </p>
            </div>
            <div className='space-y-6 mb-8'>
              <div className='relative'>
                <input
                  type='password'
                  placeholder='Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none pr-12'
                />
                <button className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                </button>
              </div>
              <div className='relative'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none pr-12'
                />
                <button className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={handleResetPassword}
              className='absolute bottom-24 w-[90%] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full py-4 text-black font-semibold text-lg'
            >
              Reset Password
            </button>
          </>
        )
    }
  }

  return (
    <div className='bg-black h-screen relative text-white p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-20'>
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : router.back()}
          className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
      </div>

      {renderStep()}
      
      <Toaster position='top-center' />
    </div>
  )
}

export default ForgotPasswordPage