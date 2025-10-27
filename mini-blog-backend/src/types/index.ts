import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
}