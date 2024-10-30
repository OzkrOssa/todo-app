import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  withCredentials: true,
  headers:{
    "Content-Type": "application/json",
  }
});

export interface AuthDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  email: string;
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  expected_date: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  expected_date?: string;
}

export const AuthService = {
  async login(authDto: AuthDTO) {
    console.log(authDto)
    const response = await api.post('/auth/login', authDto);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(registerDTO: RegisterDTO) {
    const response = await api.post('/auth/register', registerDTO);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};


export const TaskService = {
  async createTask(taskDTO: TaskDTO) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    const response = await api.post('/tasks', taskDTO, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async getAllTasks() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    const response = await api.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async getTaskById(id: string) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    const response = await api.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async updateTask(id: string, updateTaskDTO: UpdateTaskDTO) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    const response = await api.put(`/tasks/${id}`, updateTaskDTO, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async deleteTask(id: string) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    const response = await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default api;
