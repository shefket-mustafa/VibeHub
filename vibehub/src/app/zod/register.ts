import { z } from 'zod'

export const registerSchema = z.object({
    email: z.email({ message: "Invalid email" }), 
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // attach error to this field
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>