import { Router } from 'express';
import { body } from 'express-validator';
import { PostController } from '../controllers/postController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = Router();
const postController = new PostController();

const createPostValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Заголовок повинен містити від 3 до 200 символів'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Текст повинен містити мінімум 10 символів')
];

router.use(protect);

router.post('/', validate(createPostValidation), postController.createPost.bind(postController));
router.get('/', postController.getUserPosts.bind(postController));
router.get('/:id', postController.getPost.bind(postController));
router.delete('/:id', postController.deletePost.bind(postController));

export default router;