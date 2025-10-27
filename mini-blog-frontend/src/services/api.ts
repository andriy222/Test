import axios from 'axios';
import { authUtils } from '../utils/auth';
import { AuthResponse, CreatePostData, LoginData, Post, PostsResponse, RegisterData } from '../types';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Створюємо axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = authUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authUtils.logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const postsAPI = {
  getPosts: async (): Promise<PostsResponse> => {
    const response = await api.get<PostsResponse>('/posts');
    return response.data;
  },

  getPost: async (id: string): Promise<{ success: boolean; post: Post }> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostData): Promise<{ success: boolean; post: Post }> => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  deletePost: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};