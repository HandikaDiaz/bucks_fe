import { z } from 'zod';

export const registerSchema = z.object({
    fullname: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().nonempty("Email is required").email("Invalid email").max(50, "Email must be at most 50 characters"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").max(50, "Password must be at most 50 characters"),
    gender: z.enum(["MALE", "FEMALE"], { required_error: "Gender is required" }),
})

export type RegisterSchema = z.infer<typeof registerSchema>