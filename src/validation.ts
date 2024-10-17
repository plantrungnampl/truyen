import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  email: z
    .string()
    .trim()
    .min(1, "required")
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export type signupValues = z.infer<typeof signUpSchema>;
export const loginSchema = z.object({
  username: z.string().min(1, { message: "required" }),
  password: z.string().min(1, { message: "required" }),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: z.string().max(500, { message: "max 500 chacracter" }).optional(),
  imageUrl: z.string().url().optional().nullable(),
});
