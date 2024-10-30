'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from './hooks/auth';

const HomePage = () => {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated === null) return;

    if (authenticated) {
      router.push('/todos');
    } else {
      router.push('/login');
    }
  }, [authenticated, router]);

  if (authenticated === null) {
    return <p>Loading...</p>;
  }

  return null;
};

export default HomePage;
