import { Post } from '../models/Post';
import { CreatePostDTO } from '../types';

export class PostService {
  async createPost(userId: string, data: CreatePostDTO) {
    const { title, content } = data;

    const post = await Post.create({
      title,
      content,
      author: userId
    });

    return {
      success: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt
      }
    };
  }

  async getUserPosts(userId: string) {
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .select('title content createdAt');

    return {
      success: true,
      count: posts.length,
      posts: posts.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt
      }))
    };
  }

  async deletePost(userId: string, postId: string) {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Пост не знайдено');
    }

    if (post.author.toString() !== userId) {
      throw new Error('Ви не маєте прав видаляти цей пост');
    }

    await Post.findByIdAndDelete(postId);

    return {
      success: true,
      message: 'Пост успішно видалено'
    };
  }

  async getPost(userId: string, postId: string) {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Пост не знайдено');
    }

    if (post.author.toString() !== userId) {
      throw new Error('Ви не маєте прав переглядати цей пост');
    }

    return {
      success: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt
      }
    };
  }
}