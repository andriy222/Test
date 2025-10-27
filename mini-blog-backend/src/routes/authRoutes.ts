import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/authController';
import { validate } from '../middleware/validationMiddleware';

const router = Router();
const authController = new AuthController();

const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Невірний формат email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль повинен містити мінімум 6 символів'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Ім\'я повинно містити мінімум 2 символи')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Невірний формат email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Пароль обов\'язковий')
];

router.post('/register', validate(registerValidation), authController.register.bind(authController));
router.post('/login', validate(loginValidation), authController.login.bind(authController));

export default router;