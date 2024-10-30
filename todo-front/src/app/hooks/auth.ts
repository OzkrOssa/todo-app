'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return { authenticated };
};
