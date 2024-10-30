import React, { useEffect, useState } from 'react';
import { TaskService, TaskDTO } from '../services/api';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

interface TodoListProps {
  updateList: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ updateList }) => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedExpectedDate, setUpdatedExpectedDate] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState(TaskStatus.PENDING); // Inicializa con un valor del enum

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await TaskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.log(err)
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [updateList]);

  const handleDelete = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.log(err)
      setError('Error deleting task');
    }
  };

  const handleEdit = (task: TaskDTO) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedExpectedDate(task.expected_date);
    setUpdatedStatus(task.status as TaskStatus); // Asumiendo que `status` es del tipo TaskStatus
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      const updatedTask: TaskDTO = { 
        ...editingTask, 
        title: updatedTitle, 
        description: updatedDescription,
        expected_date: updatedExpectedDate,
        status: updatedStatus // Utiliza el enum para el status
      };
      try {
        await TaskService.updateTask(editingTask.id, updatedTask);
        setEditingTask(null); // Limpia el estado de edición
        fetchTasks(); // Refresca la lista de tareas
      } catch (err) {
        console.log(err)
        setError('Error updating task');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-gray-500">Status: <span className={task.status === TaskStatus.COMPLETED ? 'text-green-500' : 'text-red-500'}>{task.status}</span></p>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEdit(task)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingTask && (
        <form onSubmit={handleUpdate} className="mt-6">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Title"
            required
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Description"
            required
            className="border p-2 w-full mb-2"
          />
          <input
            type="date"
            value={updatedExpectedDate}
            onChange={(e) => setUpdatedExpectedDate(e.target.value)}
            required
            className="border p-2 w-full mb-2"
          />
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value as TaskStatus)}
            required
            className="border p-2 w-full mb-2"
          >
            <option value={TaskStatus.PENDING}>{TaskStatus.PENDING}</option>
            <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
            <option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Task</button>
          <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default TodoList;
