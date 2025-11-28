'use client'
import { setLoginResponse } from '@/lib/auth'
import { adminLogin } from '@/lib/services/apiService'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter();


  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await adminLogin(email,password)
      if (response.token) {
        setLoginResponse(response)
        toast.success('Login successful!')
        router.push("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Login failed. Please try again.' )
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='bg-black min-h-screen relative text-white p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-20'>
        {/* <button className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button> */}
        <h1 className='text-2xl font-bold'>Login</h1>
        <div className='w-12'></div>
      </div>

      {/* Form Content */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold mb-4'>Enter your Email ID</h2>
        <p className='text-gray-600 text-xs'>Enter your Email ID and password to Login!</p>
      </div>

      {/* Form Fields */}
      <div className='space-y-6 mb-8'>
        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none'
        />
        
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-gray-800 rounded-full px-6 py-4 text-white placeholder-gray-400 border-none outline-none pr-12'
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 transform -translate-y-1/2'
          >
            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={showPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'} />
            </svg>
          </button>
        </div>
      </div>

      <Toaster position='top-center' />

      {/* Forgot Password */}
      <div className='text-right mb-20'>
        <button className='text-white underline'>Forgot Password</button>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className=' absolute bottom-24 w-[90%] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full py-4 text-black font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70'
      >
        {loading ? (
          <>
            <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </button>

      {/* Bottom Indicator */}
      {/* <div className='flex justify-center mt-12'>
        <div className='w-32 h-1 bg-white rounded-full'></div>
      </div> */}
    </div>
  )
}

export default LoginPage
