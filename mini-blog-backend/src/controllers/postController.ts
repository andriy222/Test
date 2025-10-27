import { Response } from 'express';
import { PostService } from '../services/postService';
import { AuthRequest } from '../types';

const postService = new PostService();

export class PostController {
  async createPost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await postService.createPost(userId, req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Помилка створення поста'
      });
    }
  }

  async getUserPosts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await postService.getUserPosts(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Помилка отримання постів'
      });
    }
  }

  async getPost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const postId = req.params.id;
      const result = await postService.getPost(userId, postId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Помилка отримання поста'
      });
    }
  }

  async deletePost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const postId = req.params.id;
      const result = await postService.deletePost(userId, postId);
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({
        success: false,
        message: error instanceof Error ? error.message : 'Помилка видалення поста'
      });
    }
  }
}