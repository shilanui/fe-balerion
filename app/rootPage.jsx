'use client';
import { Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import HeaderComponent from '@/layout/header/header';

const RootPage = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const checkUserLogin = useCallback(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);

      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      } else {
        localStorage.setItem('userData', JSON.stringify(decoded));
      }
    } catch (err) {
      console.error('Invalid token:', err);
      router.push('/auth/login');
    }
  }, []);

  useEffect(() => {
    checkUserLogin();
  }, [checkUserLogin, pathname]);

  return (
    <>
      {!pathname.includes('login') && <HeaderComponent />}
      {children}
    </>
  );
};

export default RootPage;
