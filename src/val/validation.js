import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Введиите нормальный адрес" }),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: " Пароль должен иметь как минимум одну заглавную букву",
    })
    .regex(/[a-z]/, {
      message: " Пароль должен иметь как минимум одну прописную букву",
    })
    .regex(/[0-9]/, { message: " Пароль должен иметь как минимум одну цифру" }),
  name: z.string(),
  nickname: z.string(),
  age: z.number(),
  gender: z.string(),
  date: z.number(),
});
