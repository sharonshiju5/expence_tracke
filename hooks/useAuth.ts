'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
      return;
    }

    if (requiredRole) {
      const user = getCurrentUser();
      if (user?.role?.toLowerCase() !== requiredRole.toLowerCase()) {
        router.push('/');
        return;
      }
    }
  }, [router, requiredRole]);
};