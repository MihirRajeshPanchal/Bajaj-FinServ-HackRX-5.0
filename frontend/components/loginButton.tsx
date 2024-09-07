'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';

const LoginButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
  useEffect(() => {
    const email = getCookie('email');
    setIsAuthenticated(!!email);
  }, []);

  const handleAuth = async () => {
    if (isAuthenticated) {
      deleteCookie('email');
      toast.success('Logged out');
      setIsAuthenticated(false);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response === "Authorization Successful") {
            toast.success('Authentication successful');
          setCookie('email', data.email);
          setIsAuthenticated(true);
          router.push('/home');
          
        } else {
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    }
  };

  return (
    <div>

    
    <Toaster />
    <button
      onClick={handleAuth}
      className="py-1 px-6 bg-accent font-medium text-text shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]"
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
    </div>
  );
};

export default LoginButton;