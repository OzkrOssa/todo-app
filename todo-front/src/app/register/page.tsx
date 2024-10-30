'use client';

import AuthForm from '../componentes/AuthForm';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <AuthForm type="register" />
      </div>
    </div>
  );
}
