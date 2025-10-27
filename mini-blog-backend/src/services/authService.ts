import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RegisterDTO, LoginDTO } from '../types';

export class AuthService {
  private generateToken(id: string, email: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET не визначено в змінних середовища');
    }

    return jwt.sign(
      { id, email },
      secret,
      { expiresIn: '7d' }
    );
  }

  async register(data: RegisterDTO) {
    const { email, password, name } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Користувач з таким email вже існує');
    }

    const user = await User.create({
      email,
      password,
      name
    });

    const token = this.generateToken(user._id.toString(), user.email);

    return {
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Невірний email або пароль');
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Невірний email або пароль');
    }

    const token = this.generateToken(user._id.toString(), user.email);

    return {
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    };
  }
}