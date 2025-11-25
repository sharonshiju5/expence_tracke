'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import { User } from '@/lib/types';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import Graph from '@/components/Graph';
import Transactions from '@/components/Transactions';
import Nav from '@/components/Nav';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        user.role === 'admin' ? (
          <div className='bg-black min-h-screen flex items-center justify-center text-white'>
            <div className='text-center'>
              <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
              <p className='text-gray-400'>Admin pages coming soon...</p>
            </div>
          </div>
        ) : (
          <div className='bg-black'>
            <div className="mb-20">
              <Dashboard user={user} onLogout={handleLogout} />
              <Graph />
              <Transactions />
            </div>
            <Nav />
          </div>
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
