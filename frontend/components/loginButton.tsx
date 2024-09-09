'use client';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import getAuth from '@/app/api/getAuth';

const LoginButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = getCookie('email');
    setIsAuthenticated(!!email);
  }, []);

  const handleAuth = () => {
    getAuth({
      isAuthenticated,
      setIsAuthenticated,
      onLoginSuccess: () => router.push('/home')
    });
  };

  return (
    <div>
      <Toaster />
      <button
        onClick={handleAuth}
        className="py-1 px-6 bg-accent font-medium text-background shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]"
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default LoginButton;