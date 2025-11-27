'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';

const AuthDebug = () => {
  const [authInfo, setAuthInfo] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    const authenticated = isAuthenticated();
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    setAuthInfo({
      user,
      authenticated,
      token: token ? 'exists' : 'missing',
      userRole: user?.role
    });
  }, []);

  if (!authInfo) return null;

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded text-xs z-50">
      <div>Auth: {authInfo.authenticated ? 'Yes' : 'No'}</div>
      <div>Token: {authInfo.token}</div>
      <div>User: {authInfo.user?.username || 'None'}</div>
      <div>Role: {authInfo.userRole || 'None'}</div>
    </div>
  );
};

export default AuthDebug;