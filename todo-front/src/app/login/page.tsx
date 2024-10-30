'use client';

import AuthForm from '../componentes/AuthForm';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <AuthForm type="login" />
      </div>
      <button
        onClick={handleRegisterRedirect}
        className="mt-4 text-blue-600 hover:underline"
      >
        ¿No tienes una cuenta? Regístrate aquí
      </button>
    </div>
  );
}
