import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("Username/Email is required").max(50, "Email must be at most 50 characters"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").max(50, "Password must be at most 50 characters"),
})

export type LoginSchema = z.infer<typeof loginSchema>