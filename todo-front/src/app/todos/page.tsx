"use client";
import { useState } from "react";
import { useAuth } from "../hooks/auth";
import TodoForm from "../componentes/TodoForm";
import TodoList from "../componentes/TodoList";

export default function Page() {
  const [updateList, setUpdateList] = useState(false);
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  const handleTaskAdded = () => {
    setUpdateList((prev) => !prev); // Cambia el estado para forzar la actualización de la lista
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Todo Application</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <TodoForm onTaskAdded={handleTaskAdded} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <TodoList updateList={updateList} />
        </div>
      </div>
    </div>
  );
}
