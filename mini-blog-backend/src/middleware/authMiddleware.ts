import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

interface JWTPayload {
  id: string;
  email: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Доступ заборонено. Токен не надано'
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Невірний або прострочений токен'
    });
  }
};