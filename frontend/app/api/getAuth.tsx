'use client';
import { setCookie, deleteCookie } from 'cookies-next';
import { toast } from 'sonner';

type GetAuthProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  onLoginSuccess: () => void;
};

const getAuth = async ({ isAuthenticated, setIsAuthenticated, onLoginSuccess }: GetAuthProps) => {
  if (isAuthenticated) {
    deleteCookie('email');
    toast.success('Logged out');
    setIsAuthenticated(false);
  } else {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
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
        onLoginSuccess();
      } else {
        console.error('Authentication failed');
        toast.error('Authentication failed');
      }
    } catch (error) {
      toast.error('Authentication failed');
      console.error('Error during authentication:', error);
    }
  }
};

export default getAuth;