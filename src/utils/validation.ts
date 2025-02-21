import { z } from "zod";

export const emailSchema = () =>
  z.object({
    email: z.string().email({ message: "Email is required" }),
  });

export const userDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .string()
    .regex(/^\d+$/, "Age must be a number")
    .max(3, "Age cannot exceed 3 digits"),
  location: z.string().min(1, "Location is required"),
  job: z.string().min(1, "Job is required"),
  custom: z.string().optional(),
  notes: z.string().optional(),
});

export const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password is required"),
});
