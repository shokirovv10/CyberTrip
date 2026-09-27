import { z } from 'zod';


export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  username: z.string().min(3).max(20),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class RegisterDto {
  email!: string;
  password!: string;
  username!: string;
}

export class LoginDto {
  email!: string;
  password!: string;
}
