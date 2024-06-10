import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  subject: z
    .string()
    .max(100, { message: "Subject must be less than 100 characters." }),
  body: z
    .string()
    .max(500, { message: "Body must be less than 500 characters." }),
});

export { signupSchema, loginSchema, emailSchema };
