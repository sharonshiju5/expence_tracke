'use client';

import { User } from './types';

export const setCurrentUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setLoginResponse = (response: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('accessToken');
  }
  return false;
};

export const isAdmin = (user: User | null) => {
  return user?.role === 'admin';
};