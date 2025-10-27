import mongoose, { Schema } from 'mongoose';
import { IPost } from '../types';

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Заголовок обов\'язковий'],
    trim: true,
    minlength: [3, 'Заголовок повинен містити мінімум 3 символи'],
    maxlength: [200, 'Заголовок не може перевищувати 200 символів']
  },
  content: {
    type: String,
    required: [true, 'Текст поста обов\'язковий'],
    trim: true,
    minlength: [10, 'Текст повинен містити мінімум 10 символів']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.index({ author: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>('Post', postSchema);