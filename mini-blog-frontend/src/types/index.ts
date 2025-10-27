export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface PostsResponse {
  success: boolean;
  count: number;
  posts: Post[];
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}