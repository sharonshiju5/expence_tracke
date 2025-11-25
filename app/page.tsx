'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@/lib/types';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Graph from '@/components/Graph';
import Transactions from '@/components/Transactions';
import Nav from '@/components/Nav';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

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
        < div className='bg-black'>
          <Dashboard user={user} onLogout={handleLogout} />
          <Graph />
          <Transactions />
          <Nav />

        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
